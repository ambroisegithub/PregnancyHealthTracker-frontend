import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface User {
  id: number
  email: string
  phoneNumber?: string
  role: string
  isVerified: boolean
  isFirstLogin: boolean
  profile?: {
    id: number
    firstName: string
    lastName: string
    dateOfBirth?: string
    country?: string
    city?: string
    profileImage?: string
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Register user
export const registerUser = createAsyncThunk("auth/register", async (userData: any, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/register`, userData)

    if (response.data.success) {
      const { user, profile, token } = response.data.data
      await AsyncStorage.setItem("token", token)
      return { user: { ...user, profile }, token }
    }
    throw new Error(response.data.message || "Registration failed")
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Registration failed")
  }
})

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/login`, credentials)

      if (response.data.success) {
        const { user, token } = response.data.data
        await AsyncStorage.setItem("token", token)
        return { user, token }
      }
      throw new Error(response.data.message || "Login failed")
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Login failed")
    }
  },
)

// Get user profile
export const getUserProfile = createAsyncThunk("auth/getProfile", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState() as any
    const token = state.auth.token

    const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.data.success) {
      return response.data.data
    }
    throw new Error(response.data.message || "Failed to get profile")
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to get profile")
  }
})

// Logout user
export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await AsyncStorage.removeItem("token")
    return true
  } catch (error: any) {
    return rejectWithValue("Logout failed")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setAuthFromStorage: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Get profile cases
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
      })
  },
})

export const { clearError, setAuthFromStorage } = authSlice.actions
export default authSlice.reducer
