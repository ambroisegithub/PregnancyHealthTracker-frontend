import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface ProfileState {
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: ProfileState = {
  loading: false,
  error: null,
  success: false,
}

// Update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData: any, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any
      const token = state.auth.token

      const response = await axios.put(`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        return response.data.data
      }
      throw new Error(response.data.message || "Failed to update profile")
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to update profile")
    }
  },
)

const profileSlice = createSlice({
  name: "profile",
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
      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.success = false
      })
  },
})

export const { clearError, resetSuccess } = profileSlice.actions
export default profileSlice.reducer
