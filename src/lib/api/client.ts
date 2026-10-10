import { ENV } from "@/lib/config/env";

interface RequestOptions extends RequestInit {
  fallbackData?: unknown;
  timeoutMs?: number;
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { fallbackData, timeoutMs = 8000, ...customConfig } = options;

  // Normalize endpoint URL
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${ENV.API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  // Get token from localStorage if in client environment
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem(ENV.AUTH_TOKEN_KEY);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(customConfig.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const config: RequestInit = {
    ...customConfig,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      throw new ApiError(
        `API request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (ENV.USE_MOCK_FALLBACK && fallbackData !== undefined) {
      console.warn(
        `[EduVoice API Fallback] Backend unreachable at "${url}". Using local fallback data.`,
        error
      );
      return fallbackData as T;
    }

    throw error;
  }
}
