import React from "react";
import PropTypes from "prop-types";
import "./Adding.css";

export const Adding = ({ userWord, onUserWordChange, addNewWord }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUserWordChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    addNewWord(userWord);
    e.preventDefault();
    onUserWordChange({ eng: "", rus: "" });
  };

  return (
    <div className="form__container">
      <form onSubmit={handleSubmit} className="form">
        <div className="input__container">
          <label htmlFor="engWord" className="input__label">
            Add word:
          </label>
          <input
            id="engWord"
            value={userWord.eng}
            type="text"
            onChange={handleChange}
            name="eng"
            className="form__input"
          />
        </div>
        <div className="input__container">
          <label htmlFor="rusWord" className="input__label">
            Translation:
          </label>
          <input
            id="rusWord"
            value={userWord.rus}
            type="text"
            onChange={handleChange}
            name="rus"
            className="form__input"
          />
        </div>
        <input type="submit" value="Add word" className="form__submit" />
      </form>
    </div>
  );
};

Adding.propTypes = {
  userWord: PropTypes.instanceOf(Object).isRequired,
  onUserWordChange: PropTypes.func.isRequired,
  addNewWord: PropTypes.func.isRequired,
};
