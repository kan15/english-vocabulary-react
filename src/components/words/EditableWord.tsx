import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdCheck, MdCancel } from "react-icons/md";
import "./WordItem.css";

import apiQueries from "../../api/apiQueries.tsx";

export const EditableWord = ({ word, index, setEditingId }) => {
  const [submitBtn, setSubmitBtn] = useState(false);
  const [variableWord, setVariableWord] = useState(word);

  const updateWord = () => {
    apiQueries.updateItem(
      variableWord[0],
      variableWord[1].eng,
      variableWord[1].rus
    );
  };

  const showSubmitBtn = () => {
    setSubmitBtn(true);
  };

  const hideSubmitBtn = () => {
    setSubmitBtn(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const onlyWord = { ...variableWord[1] };
    onlyWord[name] = value;
    setVariableWord([word[0], onlyWord]);
    showSubmitBtn();
  };

  const hideEditingPanel = () => {
    setEditingId("");
  };

  const onSaveButtonClick = () => {
    updateWord();
    hideSubmitBtn();
    hideEditingPanel();
  };

  return (
    <tr>
      <td>{index}</td>
      <td>
        <input
          value={variableWord[1].eng}
          type="text"
          onChange={handleChange}
          name="eng"
        />
      </td>
      <td>
        <input
          value={variableWord[1].rus}
          type="text"
          onChange={handleChange}
          name="rus"
        />
      </td>
      <td>
        <button
          title="Don't save"
          type="button"
          onClick={() => {
            hideEditingPanel();
          }}
          className="button button-cancel"
        >
          <IconContext.Provider value={{ color: "#4d4d00" }}>
            <MdCancel />
          </IconContext.Provider>
        </button>
        {submitBtn && (
          <button
            title="Save"
            type="button"
            onClick={() => {
              onSaveButtonClick();
            }}
            className="button button-submit"
          >
            <IconContext.Provider value={{ color: "#102310" }}>
              <MdCheck />
            </IconContext.Provider>
          </button>
        )}
      </td>
    </tr>
  );
};

EditableWord.propTypes = {
  word: PropTypes.instanceOf(Array).isRequired,
  setEditingId: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
