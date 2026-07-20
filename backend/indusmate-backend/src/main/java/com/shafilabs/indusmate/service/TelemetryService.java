package com.shafilabs.indusmate.service;

import com.shafilabs.indusmate.entity.Telemetry;
import com.shafilabs.indusmate.repository.TelemetryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TelemetryService {

    private final TelemetryRepository telemetryRepository;

    public TelemetryService(TelemetryRepository telemetryRepository) {
        this.telemetryRepository = telemetryRepository;
    }

    public List<Telemetry> getAllTelemetry() {
        return telemetryRepository.findAll();
    }

    public List<Telemetry> getTelemetryHistory(String machineId) {
        return telemetryRepository.findByMachineIdOrderByCreatedAtDesc(machineId);
    }

    public Optional<Telemetry> getLatestTelemetry(String machineId) {
        return telemetryRepository.findFirstByMachineIdOrderByCreatedAtDesc(
            machineId
        );
    }

    public Telemetry saveTelemetry(Telemetry telemetry) {
        return telemetryRepository.save(telemetry);
    }
}