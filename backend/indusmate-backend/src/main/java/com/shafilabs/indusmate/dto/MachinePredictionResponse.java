package com.shafilabs.indusmate.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MachinePredictionResponse {

    private int prediction;
    private String risk;

    @JsonProperty("failure_probability")
    private double failureProbability;

    @JsonProperty("health_score")
    private double healthScore;

    @JsonProperty("recommended_action")
    private String recommendedAction;

    public MachinePredictionResponse() {
    }

    public int getPrediction() {
        return prediction;
    }

    public void setPrediction(int prediction) {
        this.prediction = prediction;
    }

    public String getRisk() {
        return risk;
    }

    public void setRisk(String risk) {
        this.risk = risk;
    }

    public double getFailureProbability() {
        return failureProbability;
    }

    public void setFailureProbability(double failureProbability) {
        this.failureProbability = failureProbability;
    }

    public double getHealthScore() {
        return healthScore;
    }

    public void setHealthScore(double healthScore) {
        this.healthScore = healthScore;
    }

    public String getRecommendedAction() {
        return recommendedAction;
    }

    public void setRecommendedAction(String recommendedAction) {
        this.recommendedAction = recommendedAction;
    }
}