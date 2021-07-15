import React from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import "./WordItem.css";

export const DefaultWord = ({
  id,
  word,
  index,
  removeWord,
  setWordEditing,
  editWord,
  // prevEditedId,
}) => {
  // eslint-disable-next-line no-shadow
  // const closeOtherOpenInputs = (id) => {
  //   console.log("closeOtherOpenInputs function");
  //   // eslint-disable-next-line no-unused-expressions
  //   prevEditedId.current && onToggleStateEdit(prevEditedId.current);
  //   // eslint-disable-next-line no-param-reassign
  //   prevEditedId.current = id;
  // };

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
            // eslint-disable-next-line no-unused-expressions
            // const p = new Promise((resolve) => {
            //   onToggleStateEdit(id);
            //   resolve();
            // });
            // p.then(onToggleStateEdit).then(editWord).then(closeOtherOpenInputs);
            setWordEditing(true);
            // onToggleStateEdit(id);
            editWord(id);
            // closeOtherOpenInputs(id);
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

DefaultWord.propTypes = {
  id: PropTypes.string.isRequired,
  word: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  removeWord: PropTypes.func.isRequired,
  setWordEditing: PropTypes.func.isRequired,
  editWord: PropTypes.func.isRequired,
  // prevEditedId: PropTypes.instanceOf(Array).isRequired,
};
