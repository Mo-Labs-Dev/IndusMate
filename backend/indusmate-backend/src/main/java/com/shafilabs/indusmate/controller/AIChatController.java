package com.shafilabs.indusmate.controller;

import com.shafilabs.indusmate.dto.AIChatRequest;
import com.shafilabs.indusmate.dto.AIChatResponse;
import com.shafilabs.indusmate.service.AIChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai-chat")
@CrossOrigin(origins = "http://localhost:5173")
public class AIChatController {

    private final AIChatService aiChatService;

    public AIChatController(AIChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    @PostMapping
    public AIChatResponse askQuestion(
            @RequestBody AIChatRequest request
    ) {
        String answer =
                aiChatService.answerQuestion(request.getQuestion());

        return new AIChatResponse(answer);
    }
}