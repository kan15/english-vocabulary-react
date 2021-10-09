import React, { FC } from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import "./WordItem.css";
import { Word } from "../../Types/types";

interface WordItemProps {
  word: Word;
  index: number;
  onDeleteButtonClick: (word: Word) => void;
  onEditButtonClick: () => void;
}

export const WordItem: FC<WordItemProps> = ({
  word,
  index,
  onDeleteButtonClick,
  onEditButtonClick,
}: WordItemProps) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{word.eng}</td>
      <td>{word.rus}</td>
      <td>
        <button
          title="Edit word"
          type="button"
          onClick={() => onEditButtonClick()}
          className="button button-edit"
        >
          <IconContext.Provider value={{ color: "#661953" }}>
            <MdModeEdit />
          </IconContext.Provider>
        </button>
        <button
          title="Delete word"
          type="button"
          onClick={() => onDeleteButtonClick(word)}
          className="button button-remove"
        >
          <IconContext.Provider value={{ color: "#4d0f00" }}>
            <MdDeleteForever />
          </IconContext.Provider>
        </button>
      </td>
    </tr>
  );
};
