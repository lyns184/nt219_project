"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  sub: string // User ID from OAuth provider
  email: string
  email_verified: boolean
  name: string
  given_name?: string
  nickname?: string
  picture?: string // Profile picture URL
  updated_at?: string
  sid?: string // Session ID
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithOAuth: (provider: "google" | "github") => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("[v0] Fetching profile from http://localhost:3001/auth/profile")

        const response = await fetch("http://localhost:3001/auth/profile", {
          method: "GET",
          credentials: "include", // Include cookies for session
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors", // Explicitly set CORS mode
        })

        console.log("[v0] Profile response status:", response.status)
        console.log("[v0] Profile response ok:", response.ok)

        if (response.ok) {
          const userData = await response.json()
          console.log("[v0] Profile data received:", userData)
          setUser(userData)
        } else {
          console.log("[v0] Profile fetch failed with status:", response.status)
          const errorText = await response.text()
          console.log("[v0] Error response:", errorText)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch profile:", error)
        if (error instanceof TypeError) {
          console.error("[v0] This is likely a CORS or network error")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for session
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Login failed")
      }

      const userData = await response.json()
      setUser(userData)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithOAuth = async (provider: "google" | "github") => {
    setIsLoading(true)
    window.location.href = `http://localhost:3001/auth/auth/${provider}`
  }

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Registration failed")
      }

      const userData = await response.json()
      setUser(userData)
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      console.log("[v0] Logging out...")
      window.location.href = "http://localhost:3001/auth/logout"
      console.log("[v0] Logout successful")
    } catch (error) {
      console.error("[v0] Logout error:", error)
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithOAuth, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
