import React, { useRef } from "react";
import { IconContext } from "react-icons";
import { MdModeEdit, MdDeleteForever, MdCheck, MdCancel } from "react-icons/md";
import "./WordItem.css";

export const WordItem = ({
  id,
  word,
  index,
  removeWord,
  variableWord,
  onToggleStateEdit,
  editWord,
  setVariableWord,
  prevEditedId,
  updateWord,
}) => {
  const displaySubmitBtn = useRef(false);

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

  // eslint-disable-next-line no-shadow
  const closeOtherOpenInputs = (id) => {
    console.log("closeOtherOpenInputs function");
    // eslint-disable-next-line no-unused-expressions
    prevEditedId.current && onToggleStateEdit(prevEditedId.current);
    // eslint-disable-next-line no-param-reassign
    prevEditedId.current = id;
  };

  const cleanPrevEditedId = () => {
    // eslint-disable-next-line no-param-reassign
    prevEditedId.current = "";
  };

  const renderEditView = () => (
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
            onToggleStateEdit(id);
            cleanPrevEditedId();
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

  const renderDefaultView = () => (
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
            onToggleStateEdit(id);
            editWord(id);
            closeOtherOpenInputs(id);
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

  return word.isEdited ? renderEditView() : renderDefaultView();
};
