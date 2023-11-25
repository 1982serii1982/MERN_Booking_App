import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByLVxfdsSuOBC7mBELLQF56LeIor0lYT4",
  authDomain: "booking-app-b331e.firebaseapp.com",
  projectId: "booking-app-b331e",
  storageBucket: "booking-app-b331e.appspot.com",
  messagingSenderId: "403324855909",
  appId: "1:403324855909:web:b728ff3a38690c132b888c",
};

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
