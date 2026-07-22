package com.shafilabs.indusmate.controller;

import com.shafilabs.indusmate.dto.ProductionStatus;
import com.shafilabs.indusmate.service.ProductionStatusService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/production-status")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductionStatusController {

    private final ProductionStatusService productionStatusService;

    public ProductionStatusController(
            ProductionStatusService productionStatusService
    ) {
        this.productionStatusService = productionStatusService;
    }

    @GetMapping
    public List<ProductionStatus> getProductionStatuses() {
        return productionStatusService.getProductionStatuses();
    }
}