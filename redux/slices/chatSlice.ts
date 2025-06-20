import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface ChatMessage {
  id: string
  role: "user" | "model"
  content: string
  timestamp: Date
}

interface ChatState {
  messages: ChatMessage[]
  loading: boolean
  error: string | null
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
}

// Send chat message
export const sendChatMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any
      const token = state.auth.token

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/chat`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.data.success) {
        return {
          userMessage: message,
          aiResponse: response.data.data.response,
        }
      }
      throw new Error(response.data.message || "Failed to send message")
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to send message")
    }
  },
)

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearMessages: (state) => {
      state.messages = []
    },
    addMessage: (state, action) => {
      state.messages.push({
        id: Date.now().toString(),
        role: action.payload.role,
        content: action.payload.content,
        timestamp: new Date(),
      })
    },
  },
  extraReducers: (builder) => {
    builder
      // Send chat message cases
      .addCase(sendChatMessage.pending, (state, action) => {
        state.loading = true
        state.error = null
        // Add user message immediately
        state.messages.push({
          id: Date.now().toString(),
          role: "user",
          content: action.meta.arg,
          timestamp: new Date(),
        })
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false
        // Add AI response
        state.messages.push({
          id: (Date.now() + 1).toString(),
          role: "model",
          content: action.payload.aiResponse,
          timestamp: new Date(),
        })
        state.error = null
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        // Remove the user message that failed
        state.messages.pop()
      })
  },
})

export const { clearError, clearMessages, addMessage } = chatSlice.actions
export default chatSlice.reducer
