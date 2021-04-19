import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMvcrLScqDa8-TgrtlyRyz8tYXoIefFvY",
  authDomain: "practiceone-7994e.firebaseapp.com",
  projectId: "practiceone-7994e",
  storageBucket: "practiceone-7994e.appspot.com",
  messagingSenderId: "283160652920",
  appId: "1:283160652920:web:00c57afae29eb45d67d18d",
  measurementId: "G-J7CJ03B76J",
};

firebase.initializeApp(firebaseConfig);
firebase.auth();

// storage
export const storage = firebase.storage();
export const storageRef = storage.ref();
export const usersRef = storageRef.child("images/users");

// db
const db = firebase.firestore();
export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const carsCollection = db.collection("cars");
export const usersCollection = db.collection("users");

//export const siteRef = db.doc("site/business");
export const employeeRef = db
  .collection("site")
  .doc("employees")
  .collection("admins");

export default firebase;
