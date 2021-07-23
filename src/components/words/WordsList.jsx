import React, { useState } from "react";
import PropTypes from "prop-types";
import { WordItem } from "./WordItem";
import { EditableWord } from "./EditableWord";
import "./WordList.css";

export const WordsList = ({ words, removeWord }) => {
  const [editingId, setEditingId] = useState("");

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
              <EditableWord
                key={word[0]}
                index={+(index + 1)}
                word={word}
                setEditingId={setEditingId}
              />
            ) : (
              <WordItem
                key={word[0]}
                word={word}
                index={+(index + 1)}
                onDeleteButtonClick={removeWord}
                onEditButtonClick={setEditingId}
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
