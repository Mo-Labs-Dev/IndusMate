package com.shafilabs.indusmate.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "telemetry")
public class Telemetry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String machineId;
    private Double temperature;
    private Double vibration;

    private Double runningHours;
    private Double load;
    private Integer previousFailures;

    private String status;
    private LocalDateTime createdAt;

    public Telemetry() {
    }

    @PrePersist
    public void beforeSave() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }

        if (runningHours == null) {
            runningHours = 0.0;
        }

        if (load == null) {
            load = 0.0;
        }

        if (previousFailures == null) {
            previousFailures = 0;
        }
    }

    public Long getId() {
        return id;
    }

    public String getMachineId() {
        return machineId;
    }

    public void setMachineId(String machineId) {
        this.machineId = machineId;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getVibration() {
        return vibration;
    }

    public void setVibration(Double vibration) {
        this.vibration = vibration;
    }

    public Double getRunningHours() {
        return runningHours;
    }

    public void setRunningHours(Double runningHours) {
        this.runningHours = runningHours;
    }

    public Double getLoad() {
        return load;
    }

    public void setLoad(Double load) {
        this.load = load;
    }

    public Integer getPreviousFailures() {
        return previousFailures;
    }

    public void setPreviousFailures(Integer previousFailures) {
        this.previousFailures = previousFailures;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}