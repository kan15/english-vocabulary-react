import React, { FC, useState } from "react";
import { WordItem } from "./WordItem";
import { EditableWord } from "./EditableWord";
import "./WordList.css";
import { Word } from "../../Types/types";
import apiQueries from "../../api/apiQueries";
import { State } from "./WordsPage";

interface WordsListProps {
  words: Word[];
  removeWord: (word: Word) => void;
  changeType: (type: State) => void;
}

const updateWord = (word: Word) => {
  apiQueries.updateItem(word);
};

export const WordsList: FC<WordsListProps> = ({
  words,
  removeWord,
  changeType,
}: WordsListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

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
                onSaveButtonClick={(value: Word) => {
                  setEditingId(null);
                  updateWord(value);
                  changeType({ type: "loading" });
                }}
                dontSaveButtonClick={() => {
                  setEditingId(null);
                }}
              />
            ) : (
              <WordItem
                key={word.key}
                word={word}
                index={+(index + 1)}
                onDeleteButtonClick={removeWord}
                onEditButtonClick={() => {
                  setEditingId(word.key);
                }}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
