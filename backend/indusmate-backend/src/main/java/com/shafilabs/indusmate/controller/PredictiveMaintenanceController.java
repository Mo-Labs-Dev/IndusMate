package com.shafilabs.indusmate.controller;

import com.shafilabs.indusmate.dto.MachinePredictionRequest;
import com.shafilabs.indusmate.dto.MachinePredictionResponse;
import com.shafilabs.indusmate.service.PredictiveMaintenanceService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/predictive-maintenance")
@CrossOrigin(origins = "http://localhost:5173")
public class PredictiveMaintenanceController {

    private final PredictiveMaintenanceService predictiveMaintenanceService;

    public PredictiveMaintenanceController(
            PredictiveMaintenanceService predictiveMaintenanceService
    ) {
        this.predictiveMaintenanceService =
                predictiveMaintenanceService;
    }

    @PostMapping("/predict")
    public MachinePredictionResponse predict(
            @RequestBody MachinePredictionRequest request
    ) {
        return predictiveMaintenanceService.predict(request);
    }
}