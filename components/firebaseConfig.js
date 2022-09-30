import firebase from "firebase"
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyACNsGS0xnDmsG7VmYlZiSnDDUoCt_gifw",
    authDomain: "meuapp-c7dc6.firebaseapp.com",
    databaseURL: "https://meuapp-c7dc6-default-rtdb.firebaseio.com",
    projectId: "meuapp-c7dc6",
    storageBucket: "meuapp-c7dc6.appspot.com",
    messagingSenderId: "948464671590",
    appId: "1:948464671590:web:ee73118122cc6d34b686a7",
    measurementId: "G-7SPXSQ3X96"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase