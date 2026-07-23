package com.shafilabs.indusmate.service;

import com.shafilabs.indusmate.dto.MachinePredictionRequest;
import com.shafilabs.indusmate.dto.MachinePredictionResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class PredictiveMaintenanceService {

    private final RestClient restClient;

    public PredictiveMaintenanceService(
            RestClient.Builder restClientBuilder,
            @Value("${ml.service.url}") String mlServiceUrl
    ) {
        this.restClient = restClientBuilder
                .baseUrl(mlServiceUrl)
                .build();
    }

    public MachinePredictionResponse predict(
            MachinePredictionRequest request
    ) {
        MachinePredictionResponse response = restClient
                .post()
                .uri("/predict")
                .body(request)
                .retrieve()
                .body(MachinePredictionResponse.class);

        if (response == null) {
            throw new IllegalStateException(
                    "The ML service returned an empty response."
            );
        }

        return response;
    }
}