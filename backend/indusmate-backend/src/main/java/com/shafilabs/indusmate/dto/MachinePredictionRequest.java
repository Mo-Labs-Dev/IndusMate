package com.shafilabs.indusmate.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MachinePredictionRequest {

    private double temperature;
    private double vibration;

    @JsonProperty("running_hours")
    private double runningHours;

    private double load;

    @JsonProperty("previous_failures")
    private int previousFailures;

    public MachinePredictionRequest() {
    }

    public MachinePredictionRequest(
            double temperature,
            double vibration,
            double runningHours,
            double load,
            int previousFailures
    ) {
        this.temperature = temperature;
        this.vibration = vibration;
        this.runningHours = runningHours;
        this.load = load;
        this.previousFailures = previousFailures;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getVibration() {
        return vibration;
    }

    public void setVibration(double vibration) {
        this.vibration = vibration;
    }

    public double getRunningHours() {
        return runningHours;
    }

    public void setRunningHours(double runningHours) {
        this.runningHours = runningHours;
    }

    public double getLoad() {
        return load;
    }

    public void setLoad(double load) {
        this.load = load;
    }

    public int getPreviousFailures() {
        return previousFailures;
    }

    public void setPreviousFailures(int previousFailures) {
        this.previousFailures = previousFailures;
    }
}