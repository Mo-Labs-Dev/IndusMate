package com.shafilabs.indusmate.service;

import com.shafilabs.indusmate.entity.BoltReading;
import com.shafilabs.indusmate.repository.BoltReadingRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class BoltService {

    private final RestClient restClient;
    private final BoltReadingRepository boltReadingRepository;
    private final AlertStore alertStore;
    private final SimpMessagingTemplate messagingTemplate;

    private final String apiKey;
    private final String deviceId;
    private final String pin;

    public BoltService(
            BoltReadingRepository boltReadingRepository,
            AlertStore alertStore,
            SimpMessagingTemplate messagingTemplate,
            @Value("${bolt.api-key}") String apiKey,
            @Value("${bolt.device-id}") String deviceId,
            @Value("${bolt.pin:A0}") String pin
    ) {
        this.boltReadingRepository = boltReadingRepository;
        this.alertStore = alertStore;
        this.messagingTemplate = messagingTemplate;

        this.restClient = RestClient.builder()
                .baseUrl("https://cloud.boltiot.com")
                .build();

        this.apiKey = apiKey;
        this.deviceId = deviceId;
        this.pin = pin;
    }

    public BoltReading readAndSaveAnalogValue() {
        Map<?, ?> response = restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/remote/{apiKey}/analogRead")
                        .queryParam("deviceName", deviceId)
                        .queryParam("pin", pin)
                        .build(apiKey))
                .retrieve()
                .body(Map.class);

        if (response == null) {
            throw new IllegalStateException(
                    "Bolt Cloud returned no response."
            );
        }

        String success = String.valueOf(response.get("success"));

        if (!"1".equals(success)) {
            throw new IllegalStateException(
                    "Bolt Cloud request failed: " + response
            );
        }

        Object value = response.get("value");

        if (value == null) {
            throw new IllegalStateException(
                    "Bolt Cloud response does not contain a value."
            );
        }

        int analogValue;

        try {
            analogValue = Integer.parseInt(value.toString());
        } catch (NumberFormatException exception) {
            throw new IllegalStateException(
                    "Bolt Cloud returned an invalid analog value: " + value,
                    exception
            );
        }

        BoltReading reading = new BoltReading(
                deviceId,
                pin,
                "light",
                analogValue,
                LocalDateTime.now()
        );

        BoltReading savedReading =
                boltReadingRepository.save(reading);

        alertStore.processBoltValue(
                deviceId,
                analogValue
        );

        messagingTemplate.convertAndSend(
                "/topic/bolt-reading",
                savedReading
        );

        messagingTemplate.convertAndSend(
                "/topic/alerts",
                alertStore.getAlerts()
        );

        return savedReading;
    }

    public List<BoltReading> getHistory() {
        return boltReadingRepository
                .findTop50ByOrderByCreatedAtDesc();
    }

    public BoltReading getLatestReading() {
        return boltReadingRepository
                .findTopByOrderByCreatedAtDesc()
                .orElseThrow(
                        () -> new IllegalStateException(
                                "No Bolt readings are available."
                        )
                );
    }
}