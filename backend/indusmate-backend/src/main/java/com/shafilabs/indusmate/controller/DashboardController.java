package com.shafilabs.indusmate.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @GetMapping("/summary")
    public Map<String, Object> getDashboardSummary() {
        Map<String, Object> summary = new LinkedHashMap<>();

        summary.put("factoryHealth", 95);
        summary.put("productionToday", 4620);
        summary.put("productionTarget", 5000);
        summary.put("attendanceToday", 186);
        summary.put("attendanceTarget", 200);
        summary.put("machinesRunning", 46);
        summary.put("machinesTotal", 48);
        summary.put("energyUsage", 18.2);
        summary.put("downtimeMinutes", 38);
        summary.put("activeAlerts", 2);
        summary.put("budgetUsed", 72);

        return summary;
    }
}