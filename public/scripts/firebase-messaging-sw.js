// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
 importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');

 firebase.initializeApp({
    apiKey: "AIzaSyC7Z8MMdzJTmeh1mPZt1Ln3wq9DdJbFiSU",
    authDomain: "hcfr-guide.firebaseapp.com",
    databaseURL: "https://hcfr-guide.firebaseio.com",
    projectId: "hcfr-guide",
    storageBucket: "hcfr-guide.appspot.com",
    messagingSenderId: "394617753192",
    appId: "1:394617753192:web:7d925f4fed1d2c24c9b5dd",
    measurementId: "G-RTTK2HRLYB"
 });

const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

