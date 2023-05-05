'use client'
import React from 'react'
import {PlayIcon} from '@heroicons/react/24/solid';
import { IconButton } from '../components/IconButton';

export const SamplePanel = ({...props}) => {
  return (
    <div className='rounded-md bg-slate-500/50 flex items-center p-2 gap-2 border-slate-500 border-2'>

        <IconButton Icon={PlayIcon}/>
        <p>{props.sampleName}</p>
    </div>
  )
}
