// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCXtIGYarxsrmUKWYf_UxYBXmNlCqdTaX0',
  authDomain: 'b-15da6.firebaseapp.com',
  projectId: 'b-15da6',
  storageBucket: 'b-15da6.appspot.com',
  messagingSenderId: '444274495791',
  appId: '1:444274495791:web:b1ab611e237fd982b911da',
  measurementId: 'G-GVJJ9K1XCS',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
