import React, { useState, useEffect } from "react";
import { WordsList } from "./WordsList";
import { AddForm } from "../form/AddForm";
import "bootstrap/dist/css/bootstrap.min.css";
import apiQueries from "../../api/apiQueries";

const addNewWord = (word) => {
  if (word.eng && word.rus) {
    apiQueries.addItem(word.eng.trim(), word.rus.trim());
  }
};

export const WordsPage = () => {
  const [wordsList, setWordsList] = useState([]);

  const showList = () => {
    apiQueries.getData(setWordsList);
  };

  useEffect(() => {
    showList();
  }, []);

  const removeWord = (id) => {
    apiQueries.deleteItem(id);
  };

  return (
    <>
      <AddForm addNewWord={addNewWord} />
      <WordsList words={wordsList} removeWord={removeWord} />
    </>
  );
};
