import React from 'react'
import {FolderPlusIcon} from '@heroicons/react/24/solid';
export const FileDropArea = () => {
  return (
    
    <div className='rounded-md bg-slate-500/50 border-slate-500 border-2 border-dashed text-slate-500 p-4 mt-2'>
        
            <FolderPlusIcon className=" block m-auto" width={100}/>
        
            <p className=" text-center">drag your .wav files of up to 10mb per file here</p>


    </div>

    
  )
}
