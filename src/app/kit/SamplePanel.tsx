'use client'
import React from 'react'
import {PlayIcon,ChevronDownIcon,ChevronUpIcon,XMarkIcon} from '@heroicons/react/24/solid';
import { IconButton } from '../components/IconButton';

export const SamplePanel = ({...props}) => {
  return (
    <div className='rounded-md bg-slate-500/50 flex items-center p-2 gap-2 border-slate-500 border-2'>

        <IconButton buttonHandler={props.buttonHandler} buttonAction="play" buttonSize={40} Icon={PlayIcon}/>
        <p className='grow'>{props.sampleName}</p>

        <div className='grid float-right'>
        <IconButton buttonHandler={props.buttonHandler} buttonAction="up" buttonSize={20} Icon={ChevronUpIcon}/>
        <IconButton buttonHandler={props.buttonHandler} buttonAction="down" buttonSize={20} Icon={ChevronDownIcon}/>
        </div>
        <IconButton buttonHandler={props.buttonHandler} buttonAction="delete" buttonSize={40} Icon={XMarkIcon}/>
    </div>
  )
}
