import React from "react";
import PropTypes from "prop-types";
// import Table from "react-bootstrap/Table";
import { WordItem } from "./WordItem";
import "./WordList.css";

export const WordsList = ({
  words,
  removeWord,
  onToggleStateEdit,
  variableWord,
  editWord,
  setVariableWord,
  updateWord,
  prevEditedId,
}) => {
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
                key={word[0]}
                id={word[0]}
                word={word[1]}
                variableWord={variableWord}
                index={+(index + 1)}
                removeWord={removeWord}
                onToggleStateEdit={onToggleStateEdit}
                editWord={editWord}
                setVariableWord={setVariableWord}
                updateWord={updateWord}
                prevEditedId={prevEditedId}
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
  onToggleStateEdit: PropTypes.func.isRequired,
  variableWord: PropTypes.instanceOf(Array).isRequired,
  editWord: PropTypes.func.isRequired,
  setVariableWord: PropTypes.func.isRequired,
  updateWord: PropTypes.func.isRequired,
  prevEditedId: PropTypes.instanceOf(Array).isRequired,
};
