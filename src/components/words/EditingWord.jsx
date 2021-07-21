import React, { useRef } from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdCheck, MdCancel } from "react-icons/md";
import "./WordItem.css";

import apiQueries from "../../api/apiQueries";

export const EditingWord = ({
  id,
  index,
  variableWord,
  setVariableWord,
  setEditingId,
}) => {
  const displaySubmitBtn = useRef(false);

  const updateWord = () => {
    apiQueries.updateItem(
      variableWord[0],
      variableWord[1].eng,
      variableWord[1].rus
    );
  };

  const showSubmitBtn = () => {
    displaySubmitBtn.current = true;
  };

  const hideSubmitBtn = () => {
    displaySubmitBtn.current = false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const onlyWord = { ...variableWord[1] };
    onlyWord[name] = value;
    setVariableWord([id, onlyWord]);
    showSubmitBtn();
  };

  const hideEditingPanel = () => {
    setEditingId("");
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
        {displaySubmitBtn.current && (
          <button
            title="Save"
            type="button"
            onClick={() => {
              updateWord();
              hideSubmitBtn();
              hideEditingPanel();
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

EditingWord.propTypes = {
  id: PropTypes.string.isRequired,
  variableWord: PropTypes.instanceOf(Array).isRequired,
  setVariableWord: PropTypes.func.isRequired,
  setEditingId: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
