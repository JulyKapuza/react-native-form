// import * as firebase from "firebase";
import firebase from "firebase/compat";
import "firebase/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBM9nGRrkHStpEHyor331s8R-QsmG3oeXM",
    authDomain: "react-native-auth-d540d.firebaseapp.com",
    projectId: "react-native-auth-d540d",
    storageBucket: "react-native-auth-d540d.appspot.com",
    messagingSenderId: "948794151689",
    appId: "1:948794151689:web:fdeb6638ab4acc849379d8",
    measurementId: "G-C6320QVNJB",
};
export default firebase.initializeApp(firebaseConfig);

