import React, { FC, useState } from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { MdCheck, MdCancel } from "react-icons/md";
import "./WordItem.css";
import apiQueries from "../../api/apiQueries";
import { Translation, TranslationKeys, Word } from "../../Types/types";

interface EditableWordProps {
  word: Translation;
  index: number;
  setEditingId: (value: string | ((id: string) => string)) => void; // todo если не передавать state из родительского элемента - этого не будет
}

export const EditableWord: FC<EditableWordProps> = ({
  word,
  index,
  setEditingId,
}: EditableWordProps) => {
  const [submitBtn, setSubmitBtn] = useState<boolean>(false);
  const [variableWord, setVariableWord] = useState<Word>({
    eng: "",
    rus: "",
    key: "",
  });

  const updateWord = () => {
    apiQueries.updateItem(variableWord);
  };

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

  const hideEditingPanel = (): void => {
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
