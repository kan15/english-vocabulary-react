import React, { useState } from "react";
import PropTypes from "prop-types";
import { EditingWord } from "./EditingWord";
import { DefaultWord } from "./DefaultWord";
import "./WordItem.css";

import apiQueries from "../../api/apiQueries";

export const WordItem = ({ id, word, index, removeWord, words }) => {
  const [wordEditing, setWordEditing] = useState(false);
  const [variableWord, setVariableWord] = useState([]);

  const updateWord = () => {
    apiQueries.updateItem(
      variableWord[0],
      variableWord[1].eng,
      variableWord[1].rus
    );
  };

  // eslint-disable-next-line no-shadow
  const editWord = (id) => {
    const idx = words.findIndex((el) => el[0] === id);
    const oldItem = words[idx];
    setVariableWord(oldItem);
  };

  return (
    <>
      {wordEditing ? (
        <EditingWord
          id={id}
          index={index}
          variableWord={variableWord}
          setVariableWord={setVariableWord}
          updateWord={updateWord}
          setWordEditing={setWordEditing}
        />
      ) : (
        <DefaultWord
          id={id}
          word={word}
          index={index}
          removeWord={removeWord}
          editWord={editWord}
          setWordEditing={setWordEditing}
        />
      )}
    </>
  );
};

WordItem.propTypes = {
  id: PropTypes.string.isRequired,
  word: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  removeWord: PropTypes.func.isRequired,
  words: PropTypes.instanceOf(Array).isRequired,
};
