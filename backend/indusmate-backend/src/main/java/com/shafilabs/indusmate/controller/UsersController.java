package com.shafilabs.indusmate.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UsersController {

    @GetMapping
    public List<Map<String, Object>> getUsers() {
        return List.of(
            Map.of(
                "id", 1,
                "name", "Mohamed Shafi",
                "email", "mohamed@indusmate.com",
                "department", "Management",
                "role", "Administrator",
                "status", "Active"
            ),
            Map.of(
                "id", 2,
                "name", "Arun Kumar",
                "email", "arun@indusmate.com",
                "department", "Production",
                "role", "Production Manager",
                "status", "Active"
            ),
            Map.of(
                "id", 3,
                "name", "Sara Ahmed",
                "email", "sara@indusmate.com",
                "department", "Maintenance",
                "role", "Maintenance Engineer",
                "status", "Active"
            ),
            Map.of(
                "id", 4,
                "name", "Daniel Thomas",
                "email", "daniel@indusmate.com",
                "department", "Quality",
                "role", "Quality Inspector",
                "status", "Inactive"
            )
        );
    }
}