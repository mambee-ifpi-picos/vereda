import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyByq9ohhLMl8JOeRQTvnbh6vhsbwZUfgP0',
  authDomain: 'vereda-app.firebaseapp.com',
  projectId: 'vereda-app',
  storageBucket: 'vereda-app.appspot.com',
  messagingSenderId: '67717473301',
  appId: '1:67717473301:web:2385ded2a526d9baac5a1c',
  measurementId: 'G-BTY8275BBS',
}

initializeApp(firebaseConfig)

export const auth = getAuth()
