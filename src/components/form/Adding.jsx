import React from "react";
import PropTypes from "prop-types";

export const Adding = ({ userWord, onUserWordChange, addNewWord }) => {
  const handleChange = (e) => {
    // console.log(e.target.name);
    const { name, value } = e.target;
    onUserWordChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    addNewWord(userWord);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="engWord">
        Add word:
        <input
          id="engWord"
          value={userWord.eng}
          type="text"
          onChange={handleChange}
          name="eng"
        />
      </label>
      <label htmlFor="rusWord">
        Translation into Russian:
        <input
          id="rusWord"
          value={userWord.rus}
          type="text"
          onChange={handleChange}
          name="rus"
        />
      </label>
      <input type="submit" value="ADD" />
    </form>
  );
};

Adding.propTypes = {
  userWord: PropTypes.instanceOf(Object).isRequired,
  onUserWordChange: PropTypes.func.isRequired,
  addNewWord: PropTypes.func.isRequired,
};
