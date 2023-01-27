import { onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser?.uid) {
        router.push('/login')
      }
      setUser(authUser)
    })

    return () => unsubscribe()
  }, [user, router])

  return <div>{user ? children : null}</div>
}

export default ProtectedRoute
