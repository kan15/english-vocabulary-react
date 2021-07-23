import React from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import "./WordItem.css";

export const WordItem = ({
  word,
  index,
  onDeleteButtonClick,
  onEditButtonClick,
}) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{word[1].eng}</td>
      <td>{word[1].rus}</td>
      <td>
        <button
          title="Edit word"
          type="button"
          onClick={() => onEditButtonClick(word[0])}
          className="button button-edit"
        >
          <IconContext.Provider value={{ color: "#661953" }}>
            <MdModeEdit />
          </IconContext.Provider>
        </button>
        <button
          title="Delete word"
          type="button"
          onClick={() => onDeleteButtonClick(word[0])}
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
  word: PropTypes.instanceOf(Array).isRequired,
  index: PropTypes.number.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};
