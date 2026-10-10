"use client";

import { useState, useRef, useCallback } from "react";
import { ENV } from "@/lib/config/env";
import { soundSynth } from "@/lib/audio-synth";

export interface VoiceStreamState {
  isStreaming: boolean;
  isEngineConnected: boolean;
  userSpeaking: boolean;
  agentSpeaking: boolean;
  latencyMs: number;
  transcript: Array<{ speaker: "user" | "agent"; text: string }>;
}

export function useVoiceEngineTest() {
  const [state, setState] = useState<VoiceStreamState>({
    isStreaming: false,
    isEngineConnected: false,
    userSpeaking: false,
    agentSpeaking: false,
    latencyMs: 380,
    transcript: [],
  });

  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startVoiceSession = useCallback(async (personaId = "maya-admissions") => {
    try {
      // 1. Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      streamRef.current = stream;

      // 2. Connect to Teammate 3's Voice Engine WebSocket
      const ws = new WebSocket(`${ENV.VOICE_ENGINE_URL}?persona=${personaId}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setState((prev) => ({ ...prev, isEngineConnected: true, isStreaming: true }));
        console.log("[Voice Engine] Connected to real-time voice pipeline:", ENV.VOICE_ENGINE_URL);

        // Start recording & streaming audio chunks
        const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
            ws.send(event.data);
          }
        };

        mediaRecorder.start(250); // Send audio every 250ms
      };

      ws.onmessage = (event) => {
        try {
          if (typeof event.data === "string") {
            const data = JSON.parse(event.data);
            if (data.type === "transcript") {
              setState((prev) => ({
                ...prev,
                transcript: [...prev.transcript, { speaker: data.speaker, text: data.text }],
                agentSpeaking: data.speaker === "agent",
                latencyMs: data.latencyMs || prev.latencyMs,
              }));
            }
          } else {
            // Binary audio chunk from TTS engine -> Play via AudioContext / HTMLAudio
            const audioBlob = new Blob([event.data], { type: "audio/mp3" });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
          }
        } catch (err) {
          console.warn("[Voice Engine] Message parse error:", err);
        }
      };

      ws.onerror = () => {
        // If Voice Engine is offline, fall back to browser soundSynth
        console.warn("[Voice Engine] Offline. Using local synth fallback.");
        setState((prev) => ({ ...prev, isStreaming: true, isEngineConnected: false }));
        soundSynth.speak("Hello, I am connected using local fallback engine.", { rate: 1.0 });
      };

      ws.onclose = () => {
        setState((prev) => ({ ...prev, isStreaming: false, isEngineConnected: false }));
      };
    } catch (err) {
      console.error("[Voice Engine] Microphone access error:", err);
      // Fallback
      setState((prev) => ({ ...prev, isStreaming: true, isEngineConnected: false }));
    }
  }, []);

  const stopVoiceSession = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
    soundSynth.stop();
    setState((prev) => ({
      ...prev,
      isStreaming: false,
      isEngineConnected: false,
      agentSpeaking: false,
      userSpeaking: false,
    }));
  }, []);

  return {
    ...state,
    startVoiceSession,
    stopVoiceSession,
  };
}
