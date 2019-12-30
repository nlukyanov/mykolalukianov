import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAV5VOc1-fvbwU1Ub6HA9qhfadV63s8vXI",
    authDomain: "mykolalukianov-7fc2e.firebaseapp.com",
    databaseURL: "https://mykolalukianov-7fc2e.firebaseio.com",
    projectId: "mykolalukianov-7fc2e",
    storageBucket: "mykolalukianov-7fc2e.appspot.com",
    messagingSenderId: "479551403232",
    appId: "1:479551403232:web:bced19dee61c3cd7638c85",
    measurementId: "G-K6M0FMPQ0E"
};

firebase.initializeApp(firebaseConfig);

export default firebase;