import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "process.env.VUE_APP_API_KEY",
  authDomain: "permatest-e3880.firebaseapp.com",
  databaseURL: "https://permatest-e3880.firebaseio.com",
  projectId: "permatest-e3880",
  storageBucket: "permatest-e3880.appspot.com",
  messagingSenderId: "870882088192",
  appId: "1:870882088192:web:be501eab934a25da828fe5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
// export const dbPoopBank = db.collection("poopbank");
