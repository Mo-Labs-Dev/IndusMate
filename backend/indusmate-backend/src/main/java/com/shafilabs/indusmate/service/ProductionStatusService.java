package com.shafilabs.indusmate.service;

import com.shafilabs.indusmate.dto.ProductionStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class ProductionStatusService {

    private final SimpMessagingTemplate messagingTemplate;
    private final Random random = new Random();

    private final List<ProductionStatus> machines =
            new ArrayList<>();

    public ProductionStatusService(
            SimpMessagingTemplate messagingTemplate
    ) {
        this.messagingTemplate = messagingTemplate;

        machines.add(
                new ProductionStatus(
                        "CNC Machine 1",
                        "Running",
                        1240,
                        1500,
                        82.7
                )
        );

        machines.add(
                new ProductionStatus(
                        "Assembly Line 2",
                        "Idle",
                        860,
                        1200,
                        71.7
                )
        );

        machines.add(
                new ProductionStatus(
                        "Packing Machine 3",
                        "Stopped",
                        430,
                        900,
                        47.8
                )
        );
    }

    public synchronized List<ProductionStatus>
    getProductionStatuses() {
        return new ArrayList<>(machines);
    }

    @Scheduled(fixedRate = 5000)
    public synchronized void updateProductionStatuses() {
        for (ProductionStatus machine : machines) {
            updateMachine(machine);
        }

        messagingTemplate.convertAndSend(
                "/topic/production-status",
                getProductionStatuses()
        );
    }

    private void updateMachine(ProductionStatus machine) {
        String status = machine.getStatus();

        if ("Running".equals(status)) {
            int increase = random.nextInt(6) + 1;

            int updatedCount = Math.min(
                    machine.getTarget(),
                    machine.getTodayCount() + increase
            );

            machine.setTodayCount(updatedCount);
        }

        if (random.nextInt(100) < 12) {
            machine.setStatus(getRandomStatus());
        }

        double efficiency = calculateEfficiency(machine);
        machine.setEfficiency(efficiency);
    }

    private double calculateEfficiency(
            ProductionStatus machine
    ) {
        if (machine.getTarget() <= 0) {
            return 0;
        }

        double percentage =
                ((double) machine.getTodayCount()
                        / machine.getTarget()) * 100;

        return Math.round(percentage * 10.0) / 10.0;
    }

    private String getRandomStatus() {
        int value = random.nextInt(100);

        if (value < 60) {
            return "Running";
        }

        if (value < 85) {
            return "Idle";
        }

        return "Stopped";
    }
}