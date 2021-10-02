import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddForm.css";
import { Translation } from "../../Types/types";

interface Props {
  addNewWord: (word: Translation) => void;
}

export const AddForm: React.FC<Props> = ({ addNewWord }) => {
  const [userWord, setUserWord] = useState<Translation>({ eng: "", rus: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserWord((prevState: Translation) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    addNewWord(userWord);
    e.preventDefault();
    setUserWord({ eng: "", rus: "" });
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

AddForm.propTypes = {
  addNewWord: PropTypes.func.isRequired,
};
