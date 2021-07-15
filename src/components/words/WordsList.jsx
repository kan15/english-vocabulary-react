import React from "react";
import PropTypes from "prop-types";
import { WordItem } from "./WordItem";
import "./WordList.css";

export const WordsList = ({ words, removeWord }) => {
  return (
    <div className="table-container">
      <table>
        <tr>
          <th>#</th>
          <th>Eng</th>
          <th colSpan="2">Rus</th>
        </tr>
        <tbody>
          {words.map((word, index) => {
            return (
              <WordItem
                words={words}
                key={word[0]}
                id={word[0]}
                word={word[1]}
                index={+(index + 1)}
                removeWord={removeWord}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

WordsList.propTypes = {
  words: PropTypes.instanceOf(Array).isRequired,
  removeWord: PropTypes.func.isRequired,
};
