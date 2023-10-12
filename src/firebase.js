// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyA3VfN4iZwfMsB7YX8deAL5jyCEoORIm-I",
  authDomain: "uk-immigration-96842.firebaseapp.com",
  projectId: "uk-immigration-96842",
  storageBucket: "uk-immigration-96842.appspot.com",
  messagingSenderId: "182942846521",
  appId: "1:182942846521:web:01cca915db9e4243b8c7e8",
  measurementId: "G-18H73MGG93",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);
export const auth = getAuth(firebaseApp);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(payload);
      resolve(payload);
    });
  });

