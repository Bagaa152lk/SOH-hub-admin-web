// notification.js
import { messaging, getToken } from "./firebase";

export const requestPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    console.warn("🚫 Permission denied.");
    return null;
  }

  const swRegistration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js"
  );

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: swRegistration,
  });

  if (token) {
    localStorage.setItem("FBToken", token);
    return token;
  } else {
    console.warn("❌ No token retrieved");
    return null;
  }
};
