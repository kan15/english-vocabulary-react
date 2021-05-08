import firebase from "firebase/app";
import "firebase/database";

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

const errData = (error) => {
  console.log("Error!", error);
};

const listWords = () => {
  const database = firebase.database();
  const words = database.ref("words");
  return words;
};

const apiQueries = {
  getData(onResultFetched) {
    listWords().on(
      "value",
      (data) => {
        const mapedData = Object.values(data.val());
        onResultFetched(mapedData);
      },
      errData
    );
  },

  updateData(eng, rus) {
    const newWord = {
      eng: eng,
      rus: rus,
    };
    const newWordKey = firebase.database().ref().child("words").push().key;
    const updates = {};
    updates["/words/" + newWordKey] = newWord;
    return firebase.database().ref().update(updates);
  },
};

export default apiQueries;
