import firebase from './firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAlvoVUg6EEVl6tCsFbs_oVUTVHaqucWds",
    authDomain: "dummy-6d819.firebaseapp.com",
    projectId: "dummy-6d819",
    storageBucket: "dummy-6d819.appspot.com",
    messagingSenderId: "1030024266526",
    appId: "1:1030024266526:web:f550715c828a8142ad3f0f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { auth };
export default db;
