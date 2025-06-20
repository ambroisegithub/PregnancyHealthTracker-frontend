import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface NotificationState {
  whatsappLinked: boolean
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: NotificationState = {
  whatsappLinked: false,
  loading: false,
  error: null,
  success: false,
}

// Link WhatsApp number
export const linkWhatsAppNumber = createAsyncThunk(
  "notification/linkWhatsApp",
  async (data: { userId: number; phoneNumber: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/whatsapp/link-whatsapp`, data)

      if (response.data.success) {
        return response.data
      }
      throw new Error(response.data.message || "Failed to link WhatsApp")
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to link WhatsApp")
    }
  },
)

// Send test WhatsApp message
export const sendTestWhatsAppMessage = createAsyncThunk(
  "notification/sendTestMessage",
  async (data: { phoneNumber: string; message: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/whatsapp/send-test`, data)

      if (response.data.success) {
        return response.data
      }
      throw new Error(response.data.message || "Failed to send test message")
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to send test message")
    }
  },
)

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    resetSuccess: (state) => {
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Link WhatsApp cases
      .addCase(linkWhatsAppNumber.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(linkWhatsAppNumber.fulfilled, (state, action) => {
        state.loading = false
        state.whatsappLinked = true
        state.success = true
        state.error = null
      })
      .addCase(linkWhatsAppNumber.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
      // Send test message cases
      .addCase(sendTestWhatsAppMessage.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(sendTestWhatsAppMessage.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
      })
      .addCase(sendTestWhatsAppMessage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
  },
})

export const { clearError, resetSuccess } = notificationSlice.actions
export default notificationSlice.reducer
