"use client";
import React, { useState } from "react";

export const AnimatedIconButton = ({ ...props }) => {
  const [angle,setAngle] = useState(false)

  function clickHandler() {
    setAngle(!angle);
    props.buttonHandler();
  }

  return (
    <>
      <button onClick={clickHandler} className={`active:duration-0 btn btn-primary btn-square border-2 active:border-primary-content ${props.customStyling}`}>
        <div className={`ease-out duration-500 active:duration-0 active:scale-105 ${angle == true ? "rotate-180" : "-rotate-180"}`} >        
          <props.Icon width={props.buttonSize} />
        </div>
      </button>
    </>
  );
};
