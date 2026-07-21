package com.shafilabs.indusmate.controller;

import com.shafilabs.indusmate.entity.BoltReading;
import com.shafilabs.indusmate.service.BoltService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bolt")
@CrossOrigin(origins = "http://localhost:5173")
public class BoltController {

    private final BoltService boltService;

    public BoltController(BoltService boltService) {
        this.boltService = boltService;
    }

    @GetMapping("/reading")
    public BoltReading getReading() {
        return boltService.readAndSaveAnalogValue();
    }

    @GetMapping("/history")
    public List<BoltReading> getHistory() {
        return boltService.getHistory();
    }
}