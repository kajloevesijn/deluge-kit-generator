import React, {useEffect, useState} from 'react'

export const TextInputField = ({...props}) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(()=>{
        setInputValue(props.inputDefault);
    },[props.inputDefault])

    return <div className={`flex ${props.customDivClass}`}>
        <p className={`self-center ${props.customPrefixClass}`}>{props.prefix}</p>
        <input className={`text-center duration-200 hover:border-primary-focus input bg-base-100 input-bordered border-primary border-2 z-10 w-full ${inputValue == "default" || inputValue == "" ? "text-base-content" : "text-primary-content"} ${props.customInputClass}` } onFocus={e => e.target.select()} defaultValue={props.inputDefault} type="text" value={inputValue} onChange={(e) => {setInputValue(e.target.value); props.valueChanged(e.target.value); } } />
    </div>
}
