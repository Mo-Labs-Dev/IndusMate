package com.shafilabs.indusmate.controller;

import com.shafilabs.indusmate.service.AlertStore;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:5173")
public class AlertsController {

    private final AlertStore alertStore;

    public AlertsController(AlertStore alertStore) {
        this.alertStore = alertStore;
    }

    @GetMapping
    public List<Map<String, Object>> getAlerts() {
        return alertStore.getAlerts();
    }

    @PatchMapping("/{alertId}/acknowledge")
    public Map<String, Object> acknowledgeAlert(
            @PathVariable String alertId
    ) {
        return alertStore.acknowledgeAlert(alertId);
    }
}