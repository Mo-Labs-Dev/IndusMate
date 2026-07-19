package com.shafilabs.indusmate.controller;

import com.shafilabs.indusmate.entity.Telemetry;
import com.shafilabs.indusmate.service.TelemetryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/telemetry")
@CrossOrigin(origins = "http://localhost:5173")
public class TelemetryController {

    private final TelemetryService telemetryService;

    public TelemetryController(TelemetryService telemetryService) {
        this.telemetryService = telemetryService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Telemetry createTelemetry(@RequestBody Telemetry telemetry) {
        return telemetryService.saveTelemetry(telemetry);
    }

    @GetMapping
    public List<Telemetry> getAllTelemetry() {
        return telemetryService.getAllTelemetry();
    }
}