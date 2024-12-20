importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyANQym6KF3cM4gQpRk33GzDZyKnE54xyiM",
    authDomain: "salary-safe.firebaseapp.com",
    projectId: "salary-safe",
    storageBucket: "salary-safe.firebasestorage.app",
    messagingSenderId: "252603907994",
    appId: "1:252603907994:web:298f4eea2a014bbbdc0423"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
