'use client'
import React from 'react'

export const IconButton = ({...props}) => {
    function clickHandler() {
        props.buttonHandler(props.buttonAction, props.index);
    }

  return <>
        <button onClick={clickHandler} className='transition ease-in-out duration-150 active:shadow-inner hover:shadow-md active:text-white active:duration-0 hover:-translate-y-0.5 active:translate-y-0 active:bg-white/10 active:scale-100 bg-white/5 hover:ring-2 ring-inset ring-white/10 text-slate-500 hover:text-slate-400 ring-1 rounded-md'>
            <props.Icon width={props.buttonSize}/>
        </button>
    </>
}
