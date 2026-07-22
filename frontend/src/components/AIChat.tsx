import { useState } from "react";
import type { FormEvent } from "react";
import api from "../services/api";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type AIChatResponse = {
  answer: string;
};

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Ask me about production, machine status, alerts, sensor readings, or today's factory summary.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: trimmedQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);
    setError("");

    try {
      const response = await api.post<AIChatResponse>("/ai-chat", {
        question: trimmedQuestion,
      });

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: response.data.answer,
        },
      ]);
    } catch {
      setError("Could not get an answer from the AI assistant.");
    } finally {
      setLoading(false);
    }
  }

  function askSuggestedQuestion(suggestedQuestion: string) {
    setQuestion(suggestedQuestion);
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium text-emerald-600">
          AI Factory Assistant
        </p>

        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Ask IndusMate AI
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Ask questions using live production, machine, alert, and sensor data.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {[
          "How is production today?",
          "How many machines are running?",
          "Are there any open alerts?",
          "What is the latest sensor value?",
          "Give me a factory summary",
        ].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => askSuggestedQuestion(suggestion)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="mt-5 h-80 space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-6 ${
                message.role === "user"
                  ? "bg-emerald-500 text-slate-950"
                  : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
              Analyzing factory data...
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about production, machines, alerts, or sensors..."
          className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        />

        <button
          type="submit"
          disabled={loading || question.trim().length === 0}
          className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>
    </section>
  );
}