import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers } from "redux"

import authReducer from "./slices/authSlice"
import pregnancyReducer from "./slices/pregnancySlice"
import articlesReducer from "./slices/articlesSlice"
import chatReducer from "./slices/chatSlice"
import profileReducer from "./slices/profileSlice"
import notificationReducer from "./slices/notificationSlice"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "pregnancy"], // only auth and pregnancy will be persisted
}

const rootReducer = combineReducers({
  auth: authReducer,
  pregnancy: pregnancyReducer,
  articles: articlesReducer,
  chat: chatReducer,
  profile: profileReducer,
  notification: notificationReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
