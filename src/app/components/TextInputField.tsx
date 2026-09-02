import React, { useState } from "react";

export const TextInputField = ({...props}) => {
    // Seeded from the prop; the parent remounts this component (key on uid)
    // when the underlying sample changes, so no sync-in-effect is needed.
    const [inputValue, setInputValue] = useState(props.inputDefault);

    return <div className={`flex ${props.customDivClass}`}>
        <p className={`self-center ${props.customPrefixClass}`}>{props.prefix}</p>
        <input className={`text-center font-mono duration-200 hover:border-primary-focus input bg-base-100 input-bordered border-primary border-2 z-10 w-full ${inputValue == "default" || inputValue == "" ? "text-base-content" : "text-primary-content"} ${props.customInputClass}` } onFocus={e => e.target.select()} defaultValue={props.inputDefault} type="text" value={inputValue} onChange={(e) => {setInputValue(e.target.value); props.valueChanged(e.target.value); } } />
    </div>
}
