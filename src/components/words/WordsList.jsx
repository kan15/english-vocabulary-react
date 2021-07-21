import React, { useState } from "react";
import PropTypes from "prop-types";
import { WordItem } from "./WordItem";
import { EditingWord } from "./EditingWord";
import "./WordList.css";

export const WordsList = ({ words, removeWord }) => {
  const [editingId, setEditingId] = useState("");
  const [variableWord, setVariableWord] = useState([]);

  return (
    <div className="table-container">
      <table>
        <tr>
          <th>#</th>
          <th>Eng</th>
          <th colSpan="2">Rus</th>
        </tr>
        <tbody>
          {words.map((word, index) => {
            return word[0] === editingId ? (
              <EditingWord
                key={word[0]}
                id={word[0]}
                index={+(index + 1)}
                variableWord={variableWord}
                setVariableWord={setVariableWord}
                setEditingId={setEditingId}
              />
            ) : (
              <WordItem
                key={word[0]}
                id={word[0]}
                word={word[1]}
                index={+(index + 1)}
                removeWord={removeWord}
                words={words}
                setEditingId={setEditingId}
                setVariableWord={setVariableWord}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

WordsList.propTypes = {
  words: PropTypes.instanceOf(Array).isRequired,
  removeWord: PropTypes.func.isRequired,
};
