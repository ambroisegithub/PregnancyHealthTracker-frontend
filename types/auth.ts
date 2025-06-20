export interface User {
  id: number
  email: string
  phoneNumber?: string
  role: string
  isVerified: boolean
  isFirstLogin: boolean
  profile?: Profile
}

export interface Profile {
  id: number
  firstName: string
  lastName: string
  dateOfBirth?: string
  country?: string
  city?: string
  profileImage?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
  dateOfBirth?: string
  country?: string
  city?: string
}
