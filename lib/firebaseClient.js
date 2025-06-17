import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAur2N4fjWLtkiM1ZFvtV2C94TNYWc-7O0",
  authDomain: "preach-13e29.firebaseapp.com",
  projectId: "preach-13e29",
  storageBucket: "preach-13e29.appspot.com",
  appId: "1:590898725445:web:eae6434cf133bb043f992c"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export default app; 