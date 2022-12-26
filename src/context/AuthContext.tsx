import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth'
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { auth } from '../config/firebase'

interface UserType {
  email: string | undefined | null
  uid: string | undefined | null
}

interface AuthContextType {
  user: UserType
  login: (email: string, password: string) => Promise<UserCredential>
  logOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext<AuthContextType>(AuthContext)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        })
      } else {
        setUser({ email: null, uid: null })
      }
    })
    setLoading(false)

    return () => unsubscribe()
  }, [])

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = async () => {
    setUser({ email: null, uid: null })
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
