import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAqEIFV7FsmdjftQ44PoqOlQXy6qwVEWhU",
    authDomain: "itl1-97f3a.firebaseapp.com",
    projectId: "itl1-97f3a",
    storageBucket: "itl1-97f3a.appspot.com",
    messagingSenderId: "643260305483",
    appId: "1:643260305483:web:2465efa7d53df5831fbdce",
    measurementId: "G-N40HG4H87K"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };