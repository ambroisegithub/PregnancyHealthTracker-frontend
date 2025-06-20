import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface Article {
  id: number
  week?: number
  target?: string
  title: string
  content: string
  articleImage?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface ArticlesState {
  articles: Article[]
  dailyArticle: Article | null
  pregnancyInfo: any
  loading: boolean
  error: string | null
}

const initialState: ArticlesState = {
  articles: [],
  dailyArticle: null,
  pregnancyInfo: null,
  loading: false,
  error: null,
}

// Get articles for user
export const getArticlesForUser = createAsyncThunk(
  "articles/getArticlesForUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any
      const token = state.auth.token

      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/api/my-articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        return response.data.data
      }
      throw new Error(response.data.message || "Failed to get articles")
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to get articles")
    }
  },
)

// Get daily article
export const getDailyArticle = createAsyncThunk(
  "articles/getDailyArticle",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any
      const token = state.auth.token

      const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/api/daily`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        return response.data.data
      }
      throw new Error(response.data.message || "Failed to get daily article")
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || "Failed to get daily article")
    }
  },
)

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Get articles for user cases
      .addCase(getArticlesForUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getArticlesForUser.fulfilled, (state, action) => {
        state.loading = false
        state.articles = action.payload.articles
        state.pregnancyInfo = action.payload.pregnancyInfo
        state.error = null
      })
      .addCase(getArticlesForUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Get daily article cases
      .addCase(getDailyArticle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getDailyArticle.fulfilled, (state, action) => {
        state.loading = false
        state.dailyArticle = action.payload.article
        state.pregnancyInfo = action.payload.pregnancyInfo
        state.error = null
      })
      .addCase(getDailyArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = articlesSlice.actions
export default articlesSlice.reducer
