import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiLoBDgfnN_K7NjvysQrDjsTKTTd2w4wA",
  authDomain: "recuperacion-e4ff4.firebaseapp.com",
  projectId: "recuperacion-e4ff4",
  storageBucket: "recuperacion-e4ff4.appspot.com",
  messagingSenderId: "1090789797297",
  appId: "1:1090789797297:web:466ff426d8b22a918a6190"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};
