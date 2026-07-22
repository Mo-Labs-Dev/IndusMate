package com.shafilabs.indusmate.controller;

import com.shafilabs.indusmate.dto.AIInsight;
import com.shafilabs.indusmate.service.AIInsightService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ai-insights")
@CrossOrigin(origins = "http://localhost:5173")
public class AIInsightsController {

    private final AIInsightService aiInsightService;

    public AIInsightsController(
            AIInsightService aiInsightService
    ) {
        this.aiInsightService = aiInsightService;
    }

    @GetMapping
    public List<AIInsight> getInsights() {
        return aiInsightService.generateInsights();
    }
}