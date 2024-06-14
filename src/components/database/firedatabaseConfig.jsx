import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAwBGnAPBhqTEFbIFa286tJY7yNBfQMR8s",
  authDomain: "reservacesde.firebaseapp.com",
  databaseURL: "https://reservacesde-default-rtdb.firebaseio.com",
  projectId: "reservacesde",
  storageBucket: "reservacesde.appspot.com",
  messagingSenderId: "1031786050612",
  appId: "1:1031786050612:web:bfbb8cae148333f1634661"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database  = getDatabase(app);

export { auth, database  };


