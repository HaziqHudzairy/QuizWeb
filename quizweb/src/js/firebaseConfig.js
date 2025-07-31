import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBdhySqKrvfNqFD3u7YHP3aMT8W150K9SY",
  authDomain: "quizweb-73f3a.firebaseapp.com",
  databaseURL: "https://quizweb-73f3a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quizweb-73f3a",
  storageBucket: "quizweb-73f3a.appspot.com",
  messagingSenderId: "195905269859",
  appId: "1:195905269859:web:7e15458a46f705e29c0856"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, ref, get, auth, signInAnonymously };
