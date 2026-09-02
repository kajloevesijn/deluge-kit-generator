import React, { useEffect, useState } from "react";
import { CogIcon } from "@heroicons/react/24/solid";
import { AnimatedIconButton } from "./AnimatedIconButton";

export const TextInputFieldWithRandomizer = ({ ...props }) => {
  // Seeded from inputDefault (KitBuilder starts at "default"): replaces the
  // old mount effect without violating react-hooks v6. inputDefault only
  // changes after mount via this component's own valueChanged/cog flow, which
  // the lastDefault guard below handles.
  const [inputValue, setInputValue] = useState(props.inputDefault);
  const [displayValue, setDisplayValue] = useState(props.inputDefault);
  const [scrambling, setScrambling] = useState(false);
  const [lastDefault, setLastDefault] = useState(props.inputDefault);

  // Adjust state during render when the parent pushes a new preset name
  // (randomizer button) — the React-documented alternative to
  // setState-in-effect.
  if (lastDefault !== props.inputDefault) {
    setLastDefault(props.inputDefault);
    setInputValue(props.inputDefault);
    setDisplayValue(props.inputDefault);
  }

  const getRandomLetter = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };

  function buttonHandler() {
    setScrambling(true);
    props.buttonHandler();
  }

  useEffect(() => {
    let currentWord = inputValue;
    let revealedLetters = "";
    let unrevealedLetters = inputValue; // Initialize to the full inputValue
    let intervalDuration = 500 / inputValue.length;

    const revealInterval = setInterval(() => {
      if (scrambling == false) return;
      if (revealedLetters !== inputValue) {
        // Reveal original character
        revealedLetters = inputValue.substring(0, revealedLetters.length + 1);
        unrevealedLetters = inputValue.substring(
          revealedLetters.length,
          inputValue.length
        );

        // Randomize unrevealed letters, preserving spaces
        let randomUnrevealed = Array.from(unrevealedLetters)
          .map((char) => (char === " " ? " " : getRandomLetter()))
          .join("");

        setDisplayValue(revealedLetters + randomUnrevealed);
      } else {
        setScrambling(false);
        clearInterval(revealInterval);
      }
    }, intervalDuration);

    return () => {
      clearInterval(revealInterval);
    };
  }, [inputValue]);

  return (
    <div className={`flex ${props.customDivClass}`}>
      <p className={`self-center font-mono ${props.customPrefixClass}`}>{props.prefix}</p>
      <input
        className={`text-center font-mono input bg-base-100 text-base-content duration-200 hover:border-primary-focus input-bordered border-primary border-2 z-10 w-full pl-14 ${
          inputValue != "default" ? "text-primary-content" : ""
        } ${props.customInputClass}`}
        onFocus={(e) => e.target.select()}
        defaultValue={props.inputDefault}
        type="text"
        value={displayValue}
        onChange={(e) => {
          if (scrambling === false) {
            setDisplayValue(e.target.value);
            setInputValue(e.target.value);
            props.valueChanged(e.target.value);
          }
        }}
      />
      <AnimatedIconButton
        buttonHandler={buttonHandler}
        index={props.index}
        buttonSize={40}
        Icon={CogIcon}
        customStyling={"absolute rounded-r-none z-50"}
      />
    </div>
  );
};
