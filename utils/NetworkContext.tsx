"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import NetInfo from "@react-native-community/netinfo"

interface NetworkContextType {
  isConnected: boolean
  isInternetReachable: boolean
}

const NetworkContext = createContext<NetworkContextType>({
  isConnected: true,
  isInternetReachable: true,
})

export const useNetwork = () => useContext(NetworkContext)

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true)
  const [isInternetReachable, setIsInternetReachable] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false)
      setIsInternetReachable(state.isInternetReachable ?? false)
    })

    return () => unsubscribe()
  }, [])

  return <NetworkContext.Provider value={{ isConnected, isInternetReachable }}>{children}</NetworkContext.Provider>
}
