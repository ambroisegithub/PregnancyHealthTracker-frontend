export interface ChatMessage {
  id: string
  role: "user" | "model"
  content: string
  timestamp: Date
}

export interface ChatResponse {
  response: string
}
