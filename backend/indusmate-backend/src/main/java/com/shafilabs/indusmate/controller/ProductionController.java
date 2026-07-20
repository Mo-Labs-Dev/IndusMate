package com.shafilabs.indusmate.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/production")
@CrossOrigin(origins = "*")
public class ProductionController {

    @GetMapping
    public Map<String, Object> getProductionData() {
        Map<String, Object> response = new LinkedHashMap<>();

        response.put("targetToday", 5000);
        response.put("producedToday", 4620);
        response.put("efficiency", 94);
        response.put("downtimeMinutes", 38);

        List<Map<String, Object>> orders = List.of(
            Map.of(
                "id", "ORD-1001",
                "product", "Gear Assembly",
                "target", 1200,
                "produced", 1200,
                "status", "Completed"
            ),
            Map.of(
                "id", "ORD-1002",
                "product", "Motor Housing",
                "target", 850,
                "produced", 620,
                "status", "In Progress"
            ),
            Map.of(
                "id", "ORD-1003",
                "product", "Bearing Unit",
                "target", 600,
                "produced", 410,
                "status", "Delayed"
            )
        );

        response.put("orders", orders);

        return response;
    }
}