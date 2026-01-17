import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token on mount
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // const data = await response.json()
      
      // Mock login for now
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString()
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now()
      
      localStorage.setItem('authToken', mockToken)
      localStorage.setItem('userData', JSON.stringify(mockUser))
      setUser(mockUser)
      
      return { success: true, user: mockUser }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message }
    }
  }

  const signup = async (name, email, password) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password })
      // })
      // const data = await response.json()
      
      // Mock signup for now
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date().toISOString()
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now()
      
      localStorage.setItem('authToken', mockToken)
      localStorage.setItem('userData', JSON.stringify(mockUser))
      setUser(mockUser)
      
      return { success: true, user: mockUser }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    setUser(null)
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
