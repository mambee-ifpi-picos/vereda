import { doc, getDoc } from 'firebase/firestore'

import { db } from '../config/firebase'

const getUserNameByUid = async (userId: string): Promise<string | null> => {
  if (!userId) return null
  const docRef = doc(db, 'users', userId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data().name
  } else {
    console.log(`No such user ${userId}`)
    return null
  }
}

export default getUserNameByUid
