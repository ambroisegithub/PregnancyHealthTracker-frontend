export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  PROFILE: "/api/auth/profile",

  // Pregnancy endpoints
  PREGNANCY_FORM: "/api/form",
  PREGNANCY_STATUS: "/api/status",
  PREGNANCY_STATUS_AI: "/api/pregnancy/status-with-ai",

  // Articles endpoints
  MY_ARTICLES: "/api/my-articles",
  DAILY_ARTICLE: "/api/daily",

  // Chat endpoints
  CHAT: "/api/chat",

  // WhatsApp endpoints
  WHATSAPP_LINK: "/api/whatsapp/link-whatsapp",
  WHATSAPP_TEST: "/api/whatsapp/send-test",
  WHATSAPP_STATUS: "/api/whatsapp/status",
}

export const PREGNANCY_STATUS_OPTIONS = [
  "Pregnant",
  "Delivered",
  "Aborted",
  "Stillbirth",
  "Infertile",
  "Preconception",
  "Menopausal",
  "Nulligravid",
]

export const TRIMESTER_NAMES = {
  1: "First",
  2: "Second",
  3: "Third",
}

export const STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "user_data",
  PREGNANCY_DATA: "pregnancy_data",
  ONBOARDING_COMPLETE: "onboarding_complete",
}
