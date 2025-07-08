// public/firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCtys8MDGygQFhkiWH6DoHPP0ghcVcbxqA",
  authDomain: "soh-hub-a6a9a.firebaseapp.com",
  projectId: "soh-hub-a6a9a",
  messagingSenderId: "840032830065",
  appId: "1:840032830065:web:98c691901efb132dc491d0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {


  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
