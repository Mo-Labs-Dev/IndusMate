package com.shafilabs.indusmate.service;

import com.shafilabs.indusmate.dto.AIInsight;
import com.shafilabs.indusmate.dto.ProductionStatus;
import com.shafilabs.indusmate.entity.BoltReading;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AIInsightService {

    private final BoltService boltService;
    private final ProductionStatusService productionStatusService;
    private final AlertStore alertStore;

    public AIInsightService(
            BoltService boltService,
            ProductionStatusService productionStatusService,
            AlertStore alertStore
    ) {
        this.boltService = boltService;
        this.productionStatusService = productionStatusService;
        this.alertStore = alertStore;
    }

    public List<AIInsight> generateInsights() {
        List<AIInsight> insights = new ArrayList<>();

        addSensorInsight(insights);
        addProductionInsight(insights);
        addMachineStatusInsight(insights);
        addAlertInsight(insights);

        if (insights.isEmpty()) {
            insights.add(
                    new AIInsight(
                            "success",
                            "Factory operating normally",
                            "No abnormal sensor, production, machine, or alert conditions were detected."
                    )
            );
        }

        return insights;
    }

    private void addSensorInsight(List<AIInsight> insights) {
        try {
            BoltReading latestReading =
                    boltService.getLatestReading();

            int value = latestReading.getValue();

            if (value < 100) {
                insights.add(
                        new AIInsight(
                                "critical",
                                "Very low light detected",
                                "The latest Bolt sensor value is "
                                        + value
                                        + ". Inspect the sensor area immediately."
                        )
                );
                return;
            }

            if (value < 300) {
                insights.add(
                        new AIInsight(
                                "warning",
                                "Low light level",
                                "The latest Bolt sensor value is "
                                        + value
                                        + ". Lighting may be below the recommended operating level."
                        )
                );
                return;
            }

            if (value > 950) {
                insights.add(
                        new AIInsight(
                                "info",
                                "Very bright light detected",
                                "The latest Bolt sensor value is "
                                        + value
                                        + ". Check whether lighting energy is being used unnecessarily."
                        )
                );
                return;
            }

            insights.add(
                    new AIInsight(
                            "success",
                            "Sensor level normal",
                            "The latest Bolt sensor value is "
                                    + value
                                    + ", which is within the normal range."
                    )
            );
        } catch (IllegalStateException exception) {
            insights.add(
                    new AIInsight(
                            "warning",
                            "No sensor data available",
                            "The AI engine could not find a saved Bolt sensor reading."
                    )
            );
        }
    }

    private void addProductionInsight(List<AIInsight> insights) {
        List<ProductionStatus> machines =
                productionStatusService.getProductionStatuses();

        if (machines.isEmpty()) {
            insights.add(
                    new AIInsight(
                            "warning",
                            "No production data",
                            "No production machines are currently available for analysis."
                    )
            );
            return;
        }

        double averageEfficiency = machines.stream()
                .mapToDouble(ProductionStatus::getEfficiency)
                .average()
                .orElse(0);

        int producedToday = machines.stream()
                .mapToInt(ProductionStatus::getTodayCount)
                .sum();

        int targetToday = machines.stream()
                .mapToInt(ProductionStatus::getTarget)
                .sum();

        double completion =
                targetToday == 0
                        ? 0
                        : ((double) producedToday / targetToday) * 100;

        if (averageEfficiency < 70) {
            insights.add(
                    new AIInsight(
                            "critical",
                            "Production efficiency is very low",
                            "Average machine efficiency is "
                                    + formatPercentage(averageEfficiency)
                                    + "%. Immediate investigation is recommended."
                    )
            );
        } else if (averageEfficiency < 80) {
            insights.add(
                    new AIInsight(
                            "warning",
                            "Production efficiency below target",
                            "Average machine efficiency is "
                                    + formatPercentage(averageEfficiency)
                                    + "%. Review idle and stopped machines."
                    )
            );
        } else {
            insights.add(
                    new AIInsight(
                            "success",
                            "Production efficiency healthy",
                            "Average machine efficiency is "
                                    + formatPercentage(averageEfficiency)
                                    + "%."
                    )
            );
        }

        if (completion < 70) {
            insights.add(
                    new AIInsight(
                            "warning",
                            "Production target at risk",
                            "Today's production completion is only "
                                    + formatPercentage(completion)
                                    + "%."
                    )
            );
        } else {
            insights.add(
                    new AIInsight(
                            "info",
                            "Production progress",
                            "Today's production is "
                                    + formatPercentage(completion)
                                    + "% complete."
                    )
            );
        }
    }

    private void addMachineStatusInsight(List<AIInsight> insights) {
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

        if (stopped > 0) {
            insights.add(
                    new AIInsight(
                            "critical",
                            "Machine stopped",
                            stopped
                                    + " machine(s) are stopped and require operator attention."
                    )
            );
        }

        if (idle > 0) {
            insights.add(
                    new AIInsight(
                            "warning",
                            "Idle machines detected",
                            idle
                                    + " machine(s) are idle. Check whether production can be resumed."
                    )
            );
        }

        if (running == machines.size() && !machines.isEmpty()) {
            insights.add(
                    new AIInsight(
                            "success",
                            "All machines running",
                            "All "
                                    + machines.size()
                                    + " production machines are currently running."
                    )
            );
        }
    }

    private void addAlertInsight(List<AIInsight> insights) {
        long openAlerts = alertStore.getAlerts()
                .stream()
                .filter(alert ->
                        "Open".equals(alert.get("status"))
                )
                .count();

        if (openAlerts > 0) {
            insights.add(
                    new AIInsight(
                            "critical",
                            "Open alerts require attention",
                            openAlerts
                                    + " alert(s) are currently open."
                    )
            );
        } else {
            insights.add(
                    new AIInsight(
                            "success",
                            "No open alerts",
                            "There are currently no unresolved alerts."
                    )
            );
        }
    }

    private double formatPercentage(double value) {
        return Math.round(value * 10.0) / 10.0;
    }
}