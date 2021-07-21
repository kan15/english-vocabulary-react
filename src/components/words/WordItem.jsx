import React from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import "./WordItem.css";

export const WordItem = ({
  id,
  word,
  index,
  removeWord,
  words,
  setEditingId,
  setVariableWord,
}) => {
  const editWord = (key) => {
    const idx = words.findIndex((el) => el[0] === key);
    const oldItem = words[idx];
    setVariableWord(oldItem);
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{word.eng}</td>
      <td>{word.rus}</td>
      <td>
        <button
          title="Edit word"
          type="button"
          onClick={() => {
            editWord(id);
            setEditingId(id);
          }}
          className="button button-edit"
        >
          <IconContext.Provider value={{ color: "#661953" }}>
            <MdModeEdit />
          </IconContext.Provider>
        </button>
        <button
          title="Delete word"
          type="button"
          onClick={() => removeWord(id)}
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
  id: PropTypes.string.isRequired,
  word: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  removeWord: PropTypes.func.isRequired,
  setEditingId: PropTypes.func.isRequired,
  words: PropTypes.instanceOf(Array).isRequired,
  setVariableWord: PropTypes.func.isRequired,
};
