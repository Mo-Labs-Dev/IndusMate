package com.shafilabs.indusmate.service;

import com.shafilabs.indusmate.dto.ProductionStatus;
import com.shafilabs.indusmate.entity.BoltReading;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class AIChatService {

    private final BoltService boltService;
    private final ProductionStatusService productionStatusService;
    private final AlertStore alertStore;

    public AIChatService(
            BoltService boltService,
            ProductionStatusService productionStatusService,
            AlertStore alertStore
    ) {
        this.boltService = boltService;
        this.productionStatusService = productionStatusService;
        this.alertStore = alertStore;
    }

    public String answerQuestion(String question) {
        if (question == null || question.isBlank()) {
            return "Please enter a factory-related question.";
        }

        String normalizedQuestion =
                question.toLowerCase(Locale.ROOT);

        if (
                normalizedQuestion.contains("sensor")
                        || normalizedQuestion.contains("light")
                        || normalizedQuestion.contains("bolt")
        ) {
            return answerSensorQuestion();
        }

        if (
                normalizedQuestion.contains("production")
                        || normalizedQuestion.contains("target")
                        || normalizedQuestion.contains("output")
        ) {
            return answerProductionQuestion();
        }

        if (
                normalizedQuestion.contains("machine")
                        || normalizedQuestion.contains("running")
                        || normalizedQuestion.contains("stopped")
                        || normalizedQuestion.contains("idle")
        ) {
            return answerMachineQuestion();
        }

        if (
                normalizedQuestion.contains("alert")
                        || normalizedQuestion.contains("warning")
                        || normalizedQuestion.contains("critical")
        ) {
            return answerAlertQuestion();
        }

        if (
                normalizedQuestion.contains("summary")
                        || normalizedQuestion.contains("factory")
                        || normalizedQuestion.contains("today")
        ) {
            return buildFactorySummary();
        }

        return """
                I can currently answer questions about:
                sensor readings, production progress, machine status,
                alerts, and the overall factory summary.
                """;
    }

    private String answerSensorQuestion() {
        try {
            BoltReading reading = boltService.getLatestReading();

            return "The latest Bolt sensor value is "
                    + reading.getValue()
                    + " from device "
                    + reading.getDeviceId()
                    + " on pin "
                    + reading.getPin()
                    + ".";
        } catch (IllegalStateException exception) {
            return "No saved Bolt sensor reading is available.";
        }
    }

    private String answerProductionQuestion() {
        List<ProductionStatus> machines =
                productionStatusService.getProductionStatuses();

        int produced = machines.stream()
                .mapToInt(ProductionStatus::getTodayCount)
                .sum();

        int target = machines.stream()
                .mapToInt(ProductionStatus::getTarget)
                .sum();

        double percentage =
                target == 0
                        ? 0
                        : ((double) produced / target) * 100;

        return "Today's production is "
                + produced
                + " out of "
                + target
                + " units, which is "
                + round(percentage)
                + "% complete.";
    }

    private String answerMachineQuestion() {
        List<ProductionStatus> machines =
                productionStatusService.getProductionStatuses();

        long running = machines.stream()
                .filter(machine ->
                        "Running".equals(machine.getStatus())
                )
                .count();

        long idle = machines.stream()
                .filter(machine ->
                        "Idle".equals(machine.getStatus())
                )
                .count();

        long stopped = machines.stream()
                .filter(machine ->
                        "Stopped".equals(machine.getStatus())
                )
                .count();

        return running
                + " machine(s) are running, "
                + idle
                + " are idle, and "
                + stopped
                + " are stopped.";
    }

    private String answerAlertQuestion() {
        long openAlerts = alertStore.getAlerts()
                .stream()
                .filter(alert ->
                        "Open".equals(alert.get("status"))
                )
                .count();

        if (openAlerts == 0) {
            return "There are currently no open alerts.";
        }

        return "There are currently "
                + openAlerts
                + " open alert(s) requiring attention.";
    }

    private String buildFactorySummary() {
        return answerProductionQuestion()
                + " "
                + answerMachineQuestion()
                + " "
                + answerAlertQuestion()
                + " "
                + answerSensorQuestion();
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }
}