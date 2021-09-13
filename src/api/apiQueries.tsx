import firebase from "firebase/app";
// import firebase from "firebase";
import "firebase/database";
// import { array } from 'prettier';

const firebaseConfig = {
  apiKey: "AIzaSyBr1PLF6Zdq_k2eLlR3HlgUApNGejrBNIA",
  authDomain: "english-vocabulary-react.firebaseapp.com",
  databaseURL: "https://english-vocabulary-react-default-rtdb.firebaseio.com",
  projectId: "english-vocabulary-react",
  storageBucket: "english-vocabulary-react.appspot.com",
  messagingSenderId: "281598012164",
  appId: "1:281598012164:web:7e8ed5899b5cf80bf8fe51",
};
firebase.initializeApp(firebaseConfig);

const errData = (error: string) => {
  console.log("Error!", error);
};

const listWords = () => {
  const database = firebase.database();
  const words = database.ref("words");
  return words;
};

const apiQueries = {
  getData(onResultFetched: (a: string[][]) => void) {
    listWords().on(
      "value",
      (data) => {
        const serverData = data.val();
        const mapedData = Object.keys(serverData).map((key) => {
          return [key, serverData[key]];
        });
        onResultFetched(mapedData);
      },
      errData
    );
  },

  addItem(eng: string, rus: string) {
    const newWord = {
      eng,
      rus,
    };
    const newWordKey = firebase.database().ref().child("words").push().key;
    const updates: { [index: string]: {} } = {};
    updates[`/words/${newWordKey}`] = newWord;
    return firebase.database().ref().update(updates);
  },

  updateItem(key: string, eng: string, rus: string) {
    const adaNameRef = firebase.database().ref(`words/${key}`);
    adaNameRef.update({ eng, rus });
  },

  deleteItem(id: string) {
    console.log(id);
    const adaRef = firebase.database().ref(`words/${id}`);
    adaRef
      .remove()
      .then(function () {
        console.log("Remove succeeded.");
      })
      .catch(function (error) {
        console.log(`Remove failed: ${error.message}`);
      });
  },
};

export default apiQueries;
