const API = "http://localhost:8080/api/predictive-maintenance";

export interface PredictionRequest {
  temperature: number;
  vibration: number;
  running_hours: number;
  load: number;
  previous_failures: number;
}

export interface PredictionResponse {
  prediction: number;
  risk: string;
  failure_probability: number;
  health_score: number;
  recommended_action: string;
}

export async function predictMachineHealth(
  data: PredictionRequest
): Promise<PredictionResponse> {
  const response = await fetch(`${API}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}