package com.shafilabs.indusmate.controller;

import com.shafilabs.indusmate.entity.Telemetry;
import com.shafilabs.indusmate.service.TelemetryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/telemetry")
@CrossOrigin(origins = "*")
public class TelemetryController {

    private final TelemetryService telemetryService;

    public TelemetryController(TelemetryService telemetryService) {
        this.telemetryService = telemetryService;
    }

    @GetMapping
    public List<Telemetry> getAllTelemetry() {
        return telemetryService.getAllTelemetry();
    }

    @GetMapping("/{machineId}")
    public Telemetry getLatestTelemetry(@PathVariable String machineId) {
        return telemetryService
                .getLatestTelemetry(machineId)
                .orElseThrow(() -> new RuntimeException("Machine not found"));
    }

    @GetMapping("/{machineId}/history")
    public List<Telemetry> getTelemetryHistory(
            @PathVariable String machineId
    ) {
        return telemetryService.getTelemetryHistory(machineId);
    }

    @PostMapping
    public Telemetry saveTelemetry(@RequestBody Telemetry telemetry) {
        return telemetryService.saveTelemetry(telemetry);
    }
}