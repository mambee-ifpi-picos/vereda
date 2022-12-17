import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyDBwxLq3Vx5p4_reFI8q9AcAtBKPJkkJjw',
  authDomain: 'vereda-test-8efb5.firebaseapp.com',
  projectId: 'vereda-test-8efb5',
  storageBucket: 'vereda-test-8efb5.appspot.com',
  messagingSenderId: '455499074031',
  appId: '1:455499074031:web:5558577df47186737e0e1a',
}

initializeApp(firebaseConfig)

export const auth = getAuth()
