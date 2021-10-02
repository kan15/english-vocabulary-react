import React, { useState, useEffect } from "react";
// @ts-ignore
import { WordsList } from "./WordsList.tsx";
// @ts-ignore
import { AddForm } from "../form/AddForm.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
// @ts-ignore
import apiQueries from "../../api/apiQueries.tsx";
// @ts-ignore
import { Word, Translation } from "../../Types/types.tsx";

const addNewWord = (word: Translation) => {
  if (word.eng && word.rus) {
    apiQueries.addItem(word.eng.trim(), word.rus.trim());
  }
};

const notReachable = (state: never): never => {
  throw new Error(state);
};

type State =
  | {
      type: "loading";
    }
  | {
      type: "loaded";
      wordsList: Word[];
    }
  | {
      type: "error";
      error: string;
    };

export const WordsPage = () => {
  const [state, setState] = useState<State>({
    type: "loading"
  });

  const showList = () => {
    apiQueries
      .getData()
      .then((words: Word[]) => {
        setState({
          type: "loaded",
          wordsList: words,
        });
      })
      .catch((error: Error) => {
        setState({
          type: "error",
          error: error.message,
        });
      });
  };
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    switch (state.type) {
      case "loading":
        showList();
        break;
      case "loaded":
      case "error":
        break;
      default:
        return notReachable(state);
    }
  }, [state]);

  const removeWord = (word: Word) => {
    apiQueries.deleteItem(word.key);
  };

  return (
    <>
      <AddForm addNewWord={addNewWord} />
      {(state.type === "loaded")} && (<WordsList words={state.wordsList} removeWord={removeWord} />)
    </>
  );
};
