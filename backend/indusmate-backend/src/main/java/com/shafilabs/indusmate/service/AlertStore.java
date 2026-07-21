package com.shafilabs.indusmate.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class AlertStore {

    private final List<Map<String, Object>> alerts = new ArrayList<>();

    public AlertStore() {
        alerts.add(createAlert(
                "ALT-001",
                "Machine-012 temperature high",
                "Assembly Line 2",
                "Critical",
                "Open",
                "Manual"
        ));

        alerts.add(createAlert(
                "ALT-002",
                "Camera 4 disconnected",
                "Packing Area",
                "Warning",
                "Open",
                "Manual"
        ));

        alerts.add(createAlert(
                "ALT-003",
                "Maintenance due soon",
                "Conveyor 3",
                "Info",
                "Acknowledged",
                "Manual"
        ));
    }

    public synchronized List<Map<String, Object>> getAlerts() {
        return new ArrayList<>(alerts);
    }

    public synchronized Map<String, Object> acknowledgeAlert(
            String alertId
    ) {
        Map<String, Object> alert = alerts.stream()
                .filter(item -> alertId.equals(item.get("id")))
                .findFirst()
                .orElseThrow(
                        () -> new IllegalArgumentException("Alert not found")
                );

        alert.put("status", "Acknowledged");

        return new LinkedHashMap<>(alert);
    }

    public synchronized void processBoltValue(
            String deviceId,
            int value
    ) {
        if (value < 200) {
            createBoltAlertIfMissing(
                    deviceId,
                    value,
                    "Critical",
                    "Bolt light level critically low"
            );
            return;
        }

        if (value < 500) {
            createBoltAlertIfMissing(
                    deviceId,
                    value,
                    "Warning",
                    "Bolt light level below normal"
            );
            return;
        }

        resolveOpenBoltAlerts(deviceId);
    }

    private void createBoltAlertIfMissing(
            String deviceId,
            int value,
            String severity,
            String title
    ) {
        boolean alreadyExists = alerts.stream().anyMatch(alert ->
                deviceId.equals(alert.get("location"))
                        && "Bolt".equals(alert.get("source"))
                        && severity.equals(alert.get("severity"))
                        && "Open".equals(alert.get("status"))
        );

        if (alreadyExists) {
            return;
        }

        resolveOpenBoltAlerts(deviceId);

        Map<String, Object> alert = createAlert(
                "BOLT-" + UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase(),
                title + " — current value: " + value,
                deviceId,
                severity,
                "Open",
                "Bolt"
        );

        alerts.add(0, alert);
    }

    private void resolveOpenBoltAlerts(String deviceId) {
        alerts.stream()
                .filter(alert ->
                        deviceId.equals(alert.get("location"))
                                && "Bolt".equals(alert.get("source"))
                                && "Open".equals(alert.get("status"))
                )
                .forEach(alert ->
                        alert.put("status", "Acknowledged")
                );
    }

    private Map<String, Object> createAlert(
            String id,
            String title,
            String location,
            String severity,
            String status,
            String source
    ) {
        Map<String, Object> alert = new LinkedHashMap<>();

        alert.put("id", id);
        alert.put("title", title);
        alert.put("location", location);
        alert.put("severity", severity);
        alert.put("status", status);
        alert.put("time", LocalDateTime.now().toString());
        alert.put("source", source);

        return alert;
    }
}