const firebaseConfig = {
  apiKey: "AIzaSyBS6xFUP9IwDmTLJNlF9P_K4JR7h8IYaQw",
  authDomain: "hcfr-pocket-guide.firebaseapp.com",
  databaseURL: "https://hcfr-pocket-guide.firebaseio.com",
  projectId: "hcfr-pocket-guide",
  storageBucket: "hcfr-pocket-guide.appspot.com",
  messagingSenderId: "131893007539",
  appId: "1:131893007539:web:55a58831604d31f5bcccc6",
  measurementId: "G-533BTB25K1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);  
firebase.analytics();
firebase.auth();
firebase.storage();