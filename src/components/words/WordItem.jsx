import React, { useRef } from "react";

export const WordItem = ({
  id,
  word,
  index,
  removeWord,
  variableWord,
  onToggleStateEdit,
  editWord,
  setVariableWord,
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
        <button
          type="button"
          onClick={() => {
            onToggleStateEdit(id);
            hideSubmitBtn();
          }}
        >
          Cancel
        </button>
        {displaySubmitBtn.current ? (
          <button
            type="button"
            onClick={() => {
              updateWord();
              hideSubmitBtn();
            }}
          >
            Submit
          </button>
        ) : null}
      </td>
    </tr>
  );

  const renderDefaultView = () => (
    <tr>
      <td>{index}</td>
      <td>{word.eng}</td>
      <td>
        {word.rus}
        <button type="button" onClick={() => removeWord(id)}>
          Remove
        </button>
        <button
          type="button"
          onClick={() => {
            onToggleStateEdit(id);
            editWord(id);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );

  return word.isEdited ? renderEditView() : renderDefaultView();
};
