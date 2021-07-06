import React, { useState, useEffect, useRef } from "react";
import { WordsList } from "./WordsList";
import { Adding } from "../form/Adding";

import "bootstrap/dist/css/bootstrap.min.css";

import apiQueries from "../../api/apiQueries";

export const WordsPage = () => {
  const [wordsList, setWordsList] = useState([]);
  const [userWord, setUserWord] = useState({ eng: "", rus: "" });
  const [variableWord, setVariableWord] = useState([]);
  const prevEditedId = useRef("");

  // console.log(wordsList);
  // console.log(prevEditedId.current);

  const showList = () => {
    apiQueries.getData(setWordsList);
  };

  useEffect(() => {
    showList();
  }, []);

  const addNewWord = (word) => {
    if (word.eng && word.rus) {
      apiQueries.addItem(word.eng.trim(), word.rus.trim(), wordsList);
    }
  };

  const removeWord = (id) => {
    apiQueries.deleteItem(id);
  };

  // The function shows whether the word changes or not.
  const onToggleStateEdit = (id) => {
    const idx = wordsList.findIndex((el) => el[0] === id);
    const oldItem = wordsList[idx]; // with key
    console.log("onToggleStateEdit");
    console.log(oldItem);
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
    console.log("editWord function");
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
        prevEditedId={prevEditedId}
      />
      <button
        type="button"
        onClick={() => {
          console.log(prevEditedId.current);
        }}
      >
        WORK
      </button>
    </>
  );
};
