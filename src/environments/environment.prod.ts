import { initializeApp } from "firebase/app";


export const firebaseConfig = {
  production: true,
  apiKey: "AIzaSyAv_Ca4ReQNwHn-umSJmCOdlCUpNXS85_A",
  authDomain: "sensative1-d550f.firebaseapp.com",
  databaseURL: "https://sensative1-d550f-default-rtdb.firebaseio.com",
  projectId: "sensative1-d550f",
  storageBucket: "sensative1-d550f.appspot.com",
  messagingSenderId: "12761275666",
  appId: "1:12761275666:web:36011da950158fbe1da7cb"
};
export const app = initializeApp(firebaseConfig);