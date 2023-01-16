import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { auth, provider, db } from '../config/firebase'

interface UserType {
  email: string | null
  uid: string | null
  name: string | null
}

interface AuthContextType {
  user: UserType
  login: (email: string, password: string) => Promise<UserCredential>
  logOut: () => Promise<void>
  loginWithGoogle: () => Promise<UserCredential>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext<AuthContextType>(AuthContext)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    email: null,
    uid: null,
    name: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Current user', user)
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
          name: user.displayName,
        })
        saveUser(user)
      } else {
        setUser({ email: null, uid: null, name: null })
      }
    })
    setLoading(false)

    return () => unsubscribe()
  }, [])

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = () => {
    return signInWithPopup(auth, provider)
  }

  const logOut = async () => {
    setUser({ email: null, uid: null, name: null })
    await signOut(auth)
  }

  const saveUser = async (user: User) => {
    try {
      await updateDoc(doc(db, `users/${user.uid}`), {
        name: user.displayName,
        provider: user.providerId,
      })
    } catch {
      await setDoc(doc(db, `users/${user.uid}`), {
        name: user.displayName,
        provider: user.providerId,
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logOut, loginWithGoogle }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
