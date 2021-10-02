import React, { useState, useEffect } from "react";

import { WordsList } from "./WordsList";
import { AddForm } from "../form/AddForm";
import "bootstrap/dist/css/bootstrap.min.css";
import apiQueries from "../../api/apiQueries";
import { Word, Translation } from "../../Types/types";

const addNewWord = (word: Translation) => {
  if (word.eng && word.rus) {
    apiQueries.addItem({
      eng: word.eng.trim(),
      rus: word.rus.trim(),
    });
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
    type: "loading",
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
    apiQueries.deleteItem(word);
  };

  switch (state.type) {
    case "loading":
      return (
        <>
          <AddForm addNewWord={addNewWord} />
          <div>Loading...</div>
        </>
      );

    case "loaded":
      return (
        <>
          <AddForm addNewWord={addNewWord} />
          <WordsList words={state.wordsList} removeWord={removeWord} />
        </>
      );

    case "error":
      return (
        <>
          <AddForm addNewWord={addNewWord} />
          <div>Server error</div>
          <button type="button">Reload data</button>
        </>
      );

    default:
      return notReachable(state);
  }
};
