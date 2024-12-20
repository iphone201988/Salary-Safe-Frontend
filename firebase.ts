// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANQym6KF3cM4gQpRk33GzDZyKnE54xyiM",
  authDomain: "salary-safe.firebaseapp.com",
  projectId: "salary-safe",
  storageBucket: "salary-safe.appspot.com",
  messagingSenderId: "252603907994",
  appId: "1:252603907994:web:298f4eea2a014bbbdc0423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleauthProvider = new GoogleAuthProvider();
export const messaging = getMessaging(app);
export const generateToken = async()=>{
  const permission = await Notification.requestPermission();
  if(permission=="granted"){
  console.log('Notification permission granted.', permission);
  const fcmToken = await getToken(messaging,{
    vapidKey: 'BKx70cNfaS1EDXYRYP2-aQ0_M_MFFdLW_iVsfu8T11Th-7g7gfLstDvrFLzVNRkanqX-nwZwwMuqx_rCsuHI6pI'
  });
  console.log('FCM Token:', fcmToken)
}
 
}
export default app;