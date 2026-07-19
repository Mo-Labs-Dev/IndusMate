package com.shafilabs.indusmate.service;

import com.shafilabs.indusmate.entity.Telemetry;
import com.shafilabs.indusmate.repository.TelemetryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TelemetryService {

    private final TelemetryRepository telemetryRepository;

    public TelemetryService(TelemetryRepository telemetryRepository) {
        this.telemetryRepository = telemetryRepository;
    }

    public Telemetry saveTelemetry(Telemetry telemetry) {
        return telemetryRepository.save(telemetry);
    }

    public List<Telemetry> getAllTelemetry() {
        return telemetryRepository.findAll();
    }
}