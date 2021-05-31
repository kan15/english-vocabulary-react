import React, { useState, useEffect } from "react";
import { WordsList } from "./WordsList";
import { Adding } from "../form/Adding";

import "bootstrap/dist/css/bootstrap.min.css";

import apiQueries from "../../api/apiQueries";

export const WordsPage = () => {
  const [wordsList, setWordsList] = useState([]);
  const [userWord, setUserWord] = useState({ eng: "", rus: "" });
  const [variableWord, setVariableWord] = useState([]);

  const showList = () => {
    apiQueries.getData(setWordsList);
  };

  useEffect(() => {
    showList();
  }, []);

  const addNewWord = (word) => {
    apiQueries.addItem(word.eng, word.rus, wordsList);
  };

  const removeWord = (id) => {
    apiQueries.deleteItem(id);
  };

  const onToggleStateEdit = (id) => {
    const idx = wordsList.findIndex((el) => el[0] === id);
    const oldItem = wordsList[idx]; // with key
    const newWord = { ...oldItem[1], isEdited: !oldItem[1].isEdited }; // without key. only word
    const newItem = [].concat(oldItem[0], newWord);
    const newWordsList = [
      ...wordsList.slice(0, idx),
      newItem,
      ...wordsList.slice(idx + 1),
    ];
    setWordsList(newWordsList);
  };

  const editWord = (id) => {
    const idx = wordsList.findIndex((el) => el[0] === id);
    const oldItem = wordsList[idx];
    setVariableWord(oldItem);
  };

  const updateWord = () => {
    apiQueries.updateItem(
      variableWord[0],
      variableWord[1].eng,
      variableWord[1].rus
    );
  };

  return (
    <>
      <Adding
        userWord={userWord}
        onUserWordChange={setUserWord}
        addNewWord={addNewWord}
      />
      <WordsList
        words={wordsList}
        removeWord={removeWord}
        onToggleStateEdit={onToggleStateEdit}
        variableWord={variableWord}
        editWord={editWord}
        setVariableWord={setVariableWord}
        updateWord={updateWord}
      />
    </>
  );
};
