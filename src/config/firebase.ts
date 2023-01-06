import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyByq9ohhLMl8JOeRQTvnbh6vhsbwZUfgP0',
  authDomain: 'vereda-app.firebaseapp.com',
  projectId: 'vereda-app',
  storageBucket: 'vereda-app.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: 'G-BTY8275BBS',
}

console.log(' process.env.API_KEY=', firebaseConfig)

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

export { auth, db, provider }
