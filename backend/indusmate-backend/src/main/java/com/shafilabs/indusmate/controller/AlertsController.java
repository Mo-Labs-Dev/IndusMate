package com.shafilabs.indusmate.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*")
public class AlertsController {

    private final List<Map<String, Object>> alerts = new ArrayList<>();

    public AlertsController() {
        alerts.add(createAlert(
            "ALT-001",
            "Machine-012 temperature high",
            "Assembly Line 2",
            "Critical",
            "Open",
            "2 min ago"
        ));

        alerts.add(createAlert(
            "ALT-002",
            "Camera 4 disconnected",
            "Packing Area",
            "Warning",
            "Open",
            "8 min ago"
        ));

        alerts.add(createAlert(
            "ALT-003",
            "Maintenance due soon",
            "Conveyor 3",
            "Info",
            "Acknowledged",
            "1 hour ago"
        ));
    }

    @GetMapping
    public List<Map<String, Object>> getAlerts() {
        return alerts;
    }

    @PatchMapping("/{alertId}/acknowledge")
    public Map<String, Object> acknowledgeAlert(
            @PathVariable String alertId
    ) {
        Map<String, Object> alert = alerts.stream()
            .filter(item -> alertId.equals(item.get("id")))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Alert not found"));

        alert.put("status", "Acknowledged");

        return alert;
    }

    private Map<String, Object> createAlert(
            String id,
            String title,
            String location,
            String severity,
            String status,
            String time
    ) {
        Map<String, Object> alert = new LinkedHashMap<>();

        alert.put("id", id);
        alert.put("title", title);
        alert.put("location", location);
        alert.put("severity", severity);
        alert.put("status", status);
        alert.put("time", time);

        return alert;
    }
}