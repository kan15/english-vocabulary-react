import React, { FC, useState } from "react";
import PropTypes from "prop-types";
import { WordItem } from "./WordItem";
import { EditableWord } from "./EditableWord";
import "./WordList.css";
import { Word } from "../../Types/types";

interface WordsListProps {
  words: Word[];
  removeWord: (word: Word) => void;
}

export const WordsList: FC<WordsListProps> = ({
  words,
  removeWord,
}: WordsListProps) => {
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
