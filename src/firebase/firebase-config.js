import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAdCF1AIFeJnbbUTviduq98553ZcBetVuo",
    authDomain: "react-app-curso-858e5.firebaseapp.com",
    projectId: "react-app-curso-858e5",
    storageBucket: "react-app-curso-858e5.appspot.com",
    messagingSenderId: "328452957577",
    appId: "1:328452957577:web:b279f17e09c06f63cc6d58"
}

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const gooleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    gooleAuthProvider,
    firebase
}
