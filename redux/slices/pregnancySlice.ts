import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface PregnancyData {
  id: number
  dateOfBirth: string
  pregnancyStatus: string
  lastDateOfMenstruation?: string
  gravida?: number
  term?: number
  preterm?: number
  abortion?: number
  living?: number
  expectedDeliveryDate?: string
  currentTrimester?: number
  gestationalWeeks?: number
  gestationalDays?: number
  createdAt: string
  updatedAt: string
}

interface PregnancyState {
  pregnancyData: PregnancyData | null
  aiInsight: string | null
  hasCompletedPregnancyForm: boolean
  loading: boolean
  error: string | null
}

const initialState: PregnancyState = {
  pregnancyData: null,
  aiInsight: null,
  hasCompletedPregnancyForm: false,
  loading: false,
  error: null,
}

// Submit pregnancy form
export const submitPregnancyForm = createAsyncThunk(
  "pregnancy/submitForm",
  async (formData: any, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any
      const token = state.auth.token

      const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/form`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        return response.data.data
      }
      throw new Error(response.data.message || "Failed to submit pregnancy form")
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to submit pregnancy form")
    }
  },
)

// Get pregnancy status
export const getPregnancyStatus = createAsyncThunk("pregnancy/getStatus", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState() as any
    const token = state.auth.token

    const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/api/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.data.success) {
      return response.data.data
    }
    throw new Error(response.data.message || "Failed to get pregnancy status")
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to get pregnancy status")
  }
})

// Get pregnancy status with AI insight
export const getPregnancyStatusWithAI = createAsyncThunk(
  "pregnancy/getStatusWithAI",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any
      const token = state.auth.token

      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/api/pregnancy/status-with-ai`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        return response.data.data
      }
      throw new Error(response.data.message || "Failed to get pregnancy status with AI")
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to get pregnancy status with AI")
    }
  },
)

// Update pregnancy form
export const updatePregnancyForm = createAsyncThunk(
  "pregnancy/updateForm",
  async (formData: any, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any
      const token = state.auth.token

      const response = await axios.put(`${process.env.EXPO_PUBLIC_BASE_URL}/api/form`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        return response.data.data
      }
      throw new Error(response.data.message || "Failed to update pregnancy form")
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to update pregnancy form")
    }
  },
)

const pregnancySlice = createSlice({
  name: "pregnancy",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setOnboardingComplete: (state) => {
      state.hasCompletedPregnancyForm = true
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit pregnancy form cases
      .addCase(submitPregnancyForm.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(submitPregnancyForm.fulfilled, (state, action) => {
        state.loading = false
        state.pregnancyData = action.payload
        state.hasCompletedPregnancyForm = true
        state.error = null
      })
      .addCase(submitPregnancyForm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Get pregnancy status cases
      .addCase(getPregnancyStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPregnancyStatus.fulfilled, (state, action) => {
        state.loading = false
        state.pregnancyData = action.payload
        state.hasCompletedPregnancyForm = true
        state.error = null
      })
      .addCase(getPregnancyStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Get pregnancy status with AI cases
      .addCase(getPregnancyStatusWithAI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPregnancyStatusWithAI.fulfilled, (state, action) => {
        state.loading = false
        state.pregnancyData = action.payload
        state.aiInsight = action.payload.aiInsight
        state.hasCompletedPregnancyForm = true
        state.error = null
      })
      .addCase(getPregnancyStatusWithAI.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Update pregnancy form cases
      .addCase(updatePregnancyForm.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePregnancyForm.fulfilled, (state, action) => {
        state.loading = false
        state.pregnancyData = action.payload
        state.error = null
      })
      .addCase(updatePregnancyForm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, setOnboardingComplete } = pregnancySlice.actions
export default pregnancySlice.reducer
