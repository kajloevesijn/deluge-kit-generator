import React, {useEffect, useState} from 'react'
import {CogIcon} from "@heroicons/react/24/solid";
import { AnimatedIconButton } from './AnimatedIconButton';

export const TextInputFieldWithRandomizer = ({...props}) => {
    const [inputValue, setInputValue] = useState("");
    const [displayValue, setDisplayValue] = useState("")

    useEffect(()=>{
        setInputValue(props.inputDefault);
    },[props.inputDefault])

    function buttonHandler(){
        props.buttonHandler();
    }

    useEffect(() => {
        let currentWord = inputValue;
        let revealedLetters = '';
        let unrevealedLetters = inputValue; // Initialize to the full inputValue
        let intervalDuration = 500 / inputValue.length;
        const revealInterval = setInterval(() => {
            if (revealedLetters !== inputValue) {
                // Reveal original character
                revealedLetters = inputValue.substring(0, revealedLetters.length + 1);
                unrevealedLetters = inputValue.substring(revealedLetters.length, inputValue.length);
                
                // Randomize unrevealed letters, preserving spaces
                let randomUnrevealed = Array.from(unrevealedLetters).map(char => char === ' ' ? ' ' : getRandomLetter()).join('');
                
                setDisplayValue(revealedLetters + randomUnrevealed);
            } else {
                clearInterval(revealInterval);
            }
        }, intervalDuration);
        
        return () => {
            clearInterval(revealInterval);
        };
      }, [inputValue]);

      const getRandomLetter = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        return alphabet[randomIndex];
      };


    return <div className={`flex ${props.customDivClass}`}>
        <p className={`self-center ${props.customPrefixClass}`}>{props.prefix}</p>
        <input className={`text-center input bg-base-100 text-base-content duration-200 hover:border-primary-focus input-bordered border-primary border-2 z-10 w-full pl-14 ${inputValue != "default" ? "text-primary-content" : ""} ${props.customInputClass}` } onFocus={e => e.target.select()} defaultValue={props.inputDefault} type="text" value={displayValue} onChange={(e) => {setInputValue(e.target.value); props.valueChanged(e.target.value); } } />
        <AnimatedIconButton buttonHandler={buttonHandler} index={props.index}
          buttonSize={40}
          Icon={CogIcon}
          customStyling={"absolute rounded-r-none z-50"} />
    </div>
}
