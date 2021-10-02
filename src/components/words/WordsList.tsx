import React, { FC, useState } from "react";
import PropTypes from "prop-types";
// @ts-ignore
import { WordItem } from "./WordItem.tsx";
// @ts-ignore
import { EditableWord } from "./EditableWord.tsx";
import "./WordList.css";
// @ts-ignore
import { Word } from "../../Types/types.tsx";

interface WordsListProps {
  words: Word[];
  removeWord: (word: Word) => void;
}

export const WordsList: FC<WordsListProps> = ({ words, removeWord }) => {
  const [editingId, setEditingId] = useState<string>(""); //  todo как это можно сделать без передачи state в ребенка?

  return (
    <div className="table-container">
      <table>
        <tr>
          <th>#</th>
          <th>Eng</th>
          <th colSpan={2}>Rus</th>
        </tr>
        <tbody>
          {words.map((word, index) => {
            return word.key === editingId ? (
              <EditableWord
                key={word.key}
                index={+(index + 1)}
                word={word}
                setEditingId={setEditingId}
              />
            ) : (
              <WordItem
                key={word.key}
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
