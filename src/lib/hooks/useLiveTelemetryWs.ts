"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ENV } from "@/lib/config/env";
import { LiveCallItem, RecentCallRecord } from "@/types/dashboard";
import { mockLiveCalls, mockRecentCalls } from "@/data/mock/dashboardData";

export interface TelemetryWebSocketMessage {
  type:
    | "CALL_STARTED"
    | "TRANSCRIPT_CHUNK"
    | "AUDIO_WAVE_UPDATE"
    | "SENTIMENT_UPDATE"
    | "CALL_ENDED"
    | "KPI_UPDATE";
  payload: unknown;
}

export function useLiveTelemetryWs() {
  const [isConnected, setIsConnected] = useState(false);
  const [liveCalls, setLiveCalls] = useState<LiveCallItem[]>(mockLiveCalls);
  const [recentCalls, setRecentCalls] = useState<RecentCallRecord[]>(mockRecentCalls);
  const [activeCallCount, setActiveCallCount] = useState(mockLiveCalls.length);
  const [lastMessageTime, setLastMessageTime] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const ws = new WebSocket(ENV.WS_URL);
      socketRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        console.log("[EduVoice WS] Connected to Realtime Telemetry WebSocket:", ENV.WS_URL);
      };

      ws.onmessage = (event) => {
        try {
          const message: TelemetryWebSocketMessage = JSON.parse(event.data);
          setLastMessageTime(new Date().toLocaleTimeString());

          switch (message.type) {
            case "CALL_STARTED": {
              const newCall = message.payload as LiveCallItem;
              setLiveCalls((prev) => [newCall, ...prev]);
              setActiveCallCount((prev) => prev + 1);
              break;
            }

            case "TRANSCRIPT_CHUNK": {
              const { callId, speaker, text, time } = message.payload as {
                callId: string;
                speaker: "agent" | "caller" | "system";
                text: string;
                time: string;
              };
              setLiveCalls((prev) =>
                prev.map((call) => {
                  if (call.id === callId) {
                    return {
                      ...call,
                      latestSnippet: text,
                      transcript: [...call.transcript, { speaker, text, time }],
                    };
                  }
                  return call;
                })
              );
              break;
            }

            case "AUDIO_WAVE_UPDATE": {
              const { callId, audioWaveLevels } = message.payload as {
                callId: string;
                audioWaveLevels: number[];
              };
              setLiveCalls((prev) =>
                prev.map((call) => (call.id === callId ? { ...call, audioWaveLevels } : call))
              );
              break;
            }

            case "SENTIMENT_UPDATE": {
              const { callId, currentSentiment } = message.payload as {
                callId: string;
                currentSentiment: LiveCallItem["currentSentiment"];
              };
              setLiveCalls((prev) =>
                prev.map((call) => (call.id === callId ? { ...call, currentSentiment } : call))
              );
              break;
            }

            case "CALL_ENDED": {
              const endedCall = message.payload as RecentCallRecord;
              setLiveCalls((prev) => prev.filter((c) => c.id !== endedCall.id));
              setRecentCalls((prev) => [endedCall, ...prev.slice(0, 49)]);
              setActiveCallCount((prev) => Math.max(0, prev - 1));
              break;
            }

            default:
              break;
          }
        } catch (err) {
          console.warn("[EduVoice WS] Failed to parse message:", err);
        }
      };

      ws.onerror = () => {
        setIsConnected(false);
      };

      ws.onclose = () => {
        setIsConnected(false);
        // Attempt reconnect after 5s
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 5000);
      };
    } catch {
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  return {
    isConnected,
    liveCalls,
    recentCalls,
    activeCallCount,
    lastMessageTime,
  };
}
