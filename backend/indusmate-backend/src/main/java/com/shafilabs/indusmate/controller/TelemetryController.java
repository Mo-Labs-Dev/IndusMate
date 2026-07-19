package com.shafilabs.indusmate.controller;

import com.shafilabs.indusmate.entity.Telemetry;
import com.shafilabs.indusmate.service.TelemetryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/telemetry")
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
}