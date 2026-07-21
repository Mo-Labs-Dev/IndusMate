package com.shafilabs.indusmate.controller;

import com.shafilabs.indusmate.service.BoltService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bolt")
@CrossOrigin(origins = "http://localhost:5173")
public class BoltController {

    private final BoltService boltService;

    public BoltController(BoltService boltService) {
        this.boltService = boltService;
    }

    @GetMapping("/reading")
    public Map<String, Object> getReading() {
        int value = boltService.readAnalogValue();

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("deviceId", "BOLT6470541");
        response.put("pin", "A0");
        response.put("sensorType", "light");
        response.put("value", value);
        response.put("timestamp", LocalDateTime.now());

        return response;
    }
}