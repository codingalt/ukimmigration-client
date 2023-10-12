// importScripts("https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js");

// importScripts("https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyA3VfN4iZwfMsB7YX8deAL5jyCEoORIm-I",
  authDomain: "uk-immigration-96842.firebaseapp.com",
  projectId: "uk-immigration-96842",
  storageBucket: "uk-immigration-96842.appspot.com",
  messagingSenderId: "182942846521",
  appId: "1:182942846521:web:01cca915db9e4243b8c7e8",
  measurementId: "G-18H73MGG93",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notification = new Notification(payload.notification.title, {
    body: payload.notification.title,
    icon: payload.notification.image,
    tag: "notification",
  });
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    title: payload.notification.title,
    body: payload.notification.title,
    icon: "/logo192.png",
  };


  self.registration.showNotification(notificationTitle, notificationOptions);
});
