import React, { useState } from "react";

import apiQueries from "../../api/apiQueries";

export const WordsPage = () => {
  const [wordsList, setWordsList] = useState([]);

  console.log(wordsList);

  const showList = () => {
    apiQueries.getData(setWordsList);
  }

  const addNewWord = (eng, rus) => {
    apiQueries.updateData(eng, rus);
  }

  return (
    <>
      <button onClick = {showList}>WORK!!!!</button>
    </>
  )
}