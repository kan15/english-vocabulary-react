import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBr1PLF6Zdq_k2eLlR3HlgUApNGejrBNIA",
  authDomain: "english-vocabulary-react.firebaseapp.com",
  databaseURL: "https://english-vocabulary-react-default-rtdb.firebaseio.com",
  projectId: "english-vocabulary-react",
  storageBucket: "english-vocabulary-react.appspot.com",
  messagingSenderId: "281598012164",
  appId: "1:281598012164:web:7e8ed5899b5cf80bf8fe51"
}

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const words = database.ref('words');

const getData = (data) => {
  console.log(data.val());
  return data.val();
}

const errData = (error) => {
  console.log('Error!', error);
}

const getResult = () => {
  words.on('value', getData, errData);
  return getData;
}

export default getResult;