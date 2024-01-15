importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDW-qr1GKM1reWp50zmVBez5sJpMB-FFg0",
  authDomain: "muroijweb.firebaseapp.com",
  projectId: "muroijweb",
  storageBucket: "muroijweb.appspot.com",
  messagingSenderId: "658005338154",
  appId: "1:658005338154:web:9f2b287e46d6e384247b53",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
