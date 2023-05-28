"use client";
import React from "react";

export const IconButton = ({ ...props }) => {
  function clickHandler() {
    props.buttonHandler();
  }

  return (
    <>
      <button onClick={clickHandler} className="btn btn-primary btn-square border-2 active:border-primary-content">
        <props.Icon width={props.buttonSize} />
      </button>
    </>
  );
};
