import React, { FC, useState } from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdCheck, MdCancel } from "react-icons/md";
import "./WordItem.css";
import { TranslationKeys, Word } from "../../Types/types";

interface EditableWordProps {
  word: Word;
  index: number;
  onSaveButtonClick: (value: Word) => void;
  dontSaveButtonClick: () => void;
}

export const EditableWord: FC<EditableWordProps> = ({
  word,
  index,
  onSaveButtonClick,
  dontSaveButtonClick,
}: EditableWordProps) => {
  const [submitBtn, setSubmitBtn] = useState<boolean>(false);
  const [variableWord, setVariableWord] = useState<Word>({
    eng: word.eng,
    rus: word.rus,
    key: word.key,
  });

  const showSubmitBtn = () => {
    setSubmitBtn(true);
  };

  const hideSubmitBtn = () => {
    setSubmitBtn(false);
  };

  const onTranslationWordChange = (type: TranslationKeys, value: string) => {
    setVariableWord({
      ...variableWord,
      [type]: value,
    });
    showSubmitBtn();
  };

  const onLocalSaveButtonClick = (value: Word) => {
    onSaveButtonClick(value);
    hideSubmitBtn();
  };

  return (
    <tr>
      <td>{index}</td>
      <td>
        <input
          value={variableWord.eng}
          type="text"
          onChange={(e) => onTranslationWordChange("eng", e.target.value)}
        />
      </td>
      <td>
        <input
          value={variableWord.rus}
          type="text"
          onChange={(e) => onTranslationWordChange("rus", e.target.value)}
        />
      </td>
      <td>
        <button
          title="Don't save"
          type="button"
          onClick={() => {
            dontSaveButtonClick();
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
              onLocalSaveButtonClick(variableWord);
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
