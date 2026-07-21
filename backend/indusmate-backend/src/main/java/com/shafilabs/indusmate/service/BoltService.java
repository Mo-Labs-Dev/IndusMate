package com.shafilabs.indusmate.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class BoltService {

    private final RestClient restClient;
    private final String apiKey;
    private final String deviceId;
    private final String pin;

    public BoltService(
            @Value("${bolt.api-key}") String apiKey,
            @Value("${bolt.device-id}") String deviceId,
            @Value("${bolt.pin:A0}") String pin
    ) {
        this.restClient = RestClient.builder()
                .baseUrl("https://cloud.boltiot.com")
                .build();

        this.apiKey = apiKey;
        this.deviceId = deviceId;
        this.pin = pin;
    }

    public int readAnalogValue() {
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

        return Integer.parseInt(value.toString());
    }
}