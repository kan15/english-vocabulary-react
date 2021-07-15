import React, { useState, useEffect } from "react";
import { WordsList } from "./WordsList";
import { Adding } from "../form/Adding";
import "bootstrap/dist/css/bootstrap.min.css";
import apiQueries from "../../api/apiQueries";

export const WordsPage = () => {
  const [wordsList, setWordsList] = useState([]);
  const [userWord, setUserWord] = useState({ eng: "", rus: "" });

  const showList = () => {
    apiQueries.getData(setWordsList);
  };

  // TODO: check this function
  useEffect(() => {
    showList();
  }, []);

  const addNewWord = (word) => {
    if (word.eng && word.rus) {
      apiQueries.addItem(word.eng.trim(), word.rus.trim(), wordsList); // TODO: delete wordsList and move beyond component
    }
  };

  const removeWord = (id) => {
    apiQueries.deleteItem(id);
  };

  return (
    <>
      <Adding
        userWord={userWord}
        onUserWordChange={setUserWord}
        addNewWord={addNewWord}
      />
      <WordsList words={wordsList} removeWord={removeWord} />
    </>
  );
};
