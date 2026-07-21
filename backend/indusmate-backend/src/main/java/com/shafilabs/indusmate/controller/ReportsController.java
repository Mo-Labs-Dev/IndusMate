package com.shafilabs.indusmate.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportsController {

    @GetMapping
    public List<Map<String, Object>> getReports() {
        return List.of(
            Map.of(
                "id", 1,
                "name", "Daily Production Report",
                "category", "Production",
                "period", "21 July 2026",
                "format", "PDF",
                "status", "Ready"
            ),
            Map.of(
                "id", 2,
                "name", "Monthly Machine Health",
                "category", "Maintenance",
                "period", "July 2026",
                "format", "Excel",
                "status", "Ready"
            ),
            Map.of(
                "id", 3,
                "name", "Attendance Summary",
                "category", "Workforce",
                "period", "July 2026",
                "format", "PDF",
                "status", "Generating"
            ),
            Map.of(
                "id", 4,
                "name", "Energy Consumption Analysis",
                "category", "Energy",
                "period", "Q3 2026",
                "format", "Excel",
                "status", "Ready"
            )
        );
    }
}