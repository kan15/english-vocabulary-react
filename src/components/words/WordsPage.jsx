import React, { useState } from "react";


import getResult from "../../api/getResult";

export const WordsPage = () => {

  const showList = () => {
    getResult();
  }

  return (
    <>
      <h1>OLEG!!!!</h1>
    </>
  )
}