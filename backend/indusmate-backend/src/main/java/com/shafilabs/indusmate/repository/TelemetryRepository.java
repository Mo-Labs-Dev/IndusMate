package com.shafilabs.indusmate.repository;

import com.shafilabs.indusmate.entity.Telemetry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TelemetryRepository extends JpaRepository<Telemetry, Long> {

    List<Telemetry> findByMachineIdOrderByCreatedAtDesc(String machineId);

    Optional<Telemetry> findFirstByMachineIdOrderByCreatedAtDesc(
        String machineId
    );
}