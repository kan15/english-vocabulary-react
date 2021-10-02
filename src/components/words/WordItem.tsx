import React, { FC } from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import "./WordItem.css";
// @ts-ignore
import { Word } from "../../Types/types.tsx";

interface WordItemProps {
  word: Word;
  index: number;
  // onDeleteButtonClick: (value: string | ((id: string) => string)) => void;
  onDeleteButtonClick: (word: Word) => void;
  onEditButtonClick: (value: string | ((id: string) => string)) => void; // todo если не передавать state из родительского элемента - этого не будет
}

export const WordItem: FC<WordItemProps> = ({
  word,
  index,
  onDeleteButtonClick,
  onEditButtonClick,
}) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{word.eng}</td>
      <td>{word.rus}</td>
      <td>
        <button
          title="Edit word"
          type="button"
          onClick={() => onEditButtonClick(word.key)} // todo скорее всего нужно переделать как и onDeleteButton
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

WordItem.propTypes = {
  word: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};
