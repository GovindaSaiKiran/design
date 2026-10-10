// Safe access to environment variables with development defaults and fallback flags

export const ENV = {
  // Backend API URL (Teammate 2 - Node.js/Python/Go server)
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",

  // WebSocket Server URL for live calls, transcripts, and telemetry
  WS_URL: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws",

  // Voice Engine Server URL (Teammate 3 - STT/TTS/LLM Real-time Audio Stream)
  VOICE_ENGINE_URL: process.env.NEXT_PUBLIC_VOICE_ENGINE_URL || "ws://localhost:8080/voice-stream",

  // Telephony Gateway Endpoint (Teammate 1 - Exotel/SIP Call Controller)
  TELEPHONY_API_URL: process.env.NEXT_PUBLIC_TELEPHONY_API_URL || "http://localhost:8000/api/telephony",

  // Mock Fallback Flag: when true, API failures or missing backend gracefully return mock data
  USE_MOCK_FALLBACK: process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK !== "false",

  // Authentication Token Key in localStorage
  AUTH_TOKEN_KEY: "aeline_auth_token",
  ORG_ID_KEY: "aeline_org_id",
};
