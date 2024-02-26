import { useContext } from "react"
import { AuthContext } from './AuthProvider'

export function useAuthContext() {
    const context = useContext(AuthContext)
  
    if (!context) {
      throw new Error('Do not use context outside scope')
    }
  
    return context
  }