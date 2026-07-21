package com.shafilabs.indusmate.controller;

import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    private final Map<String, Object> settings = new LinkedHashMap<>();

    public SettingsController() {
        settings.put("factoryName", "IndusMate Demo Factory");
        settings.put("location", "Karlsruhe, Germany");
        settings.put("timeZone", "Europe/Berlin");
        settings.put("emailAlerts", true);
        settings.put("smsAlerts", false);
        settings.put("cameraAlerts", true);
        settings.put("mqttBroker", "localhost");
        settings.put("mqttPort", 1883);
        settings.put("clientId", "indusmate-backend");
    }

    @GetMapping
    public Map<String, Object> getSettings() {
        return settings;
    }

    @PutMapping
    public Map<String, Object> updateSettings(
            @RequestBody Map<String, Object> updatedSettings
    ) {
        settings.putAll(updatedSettings);
        return settings;
    }
}