package com.shafilabs.indusmate.repository;

import com.shafilabs.indusmate.entity.Telemetry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TelemetryRepository extends JpaRepository<Telemetry, Long> {

}