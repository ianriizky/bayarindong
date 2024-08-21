/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js"
);

/** @type {ServiceWorkerGlobalScope & typeof globalThis} */
const sw = self;
/** @type {import("firebase/compat/app").default} */
const f = firebase;

const app = f.initializeApp({
  apiKey: "AIzaSyCRp9BJ6yZlDmPPTGPDpmpWceWd85O_uxo",
  authDomain: "bayarindong-app.firebaseapp.com",
  projectId: "bayarindong-app",
  storageBucket: "bayarindong-app.appspot.com",
  messagingSenderId: "58270372292",
  appId: "1:58270372292:web:81f78a2ca18ca5c767d491",
  measurementId: "G-P4GHDRXFHD",
});
const messaging = f.messaging(app);

if (!f.messaging.isSupported()) {
  throw new Error(
    "Firebase cloud messaging feature is not supported on this browser."
  );
}

messaging.onBackgroundMessage((payload) => {
  sw.registration.showNotification(payload.notification?.title || "", {
    body: payload.notification?.body,
    icon: payload.notification?.icon,
  });
});
