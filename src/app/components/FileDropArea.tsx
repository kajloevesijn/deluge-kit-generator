import React from 'react'
import {FolderPlusIcon} from '@heroicons/react/24/solid';
export const FileDropArea = ({...props}) => {

  function processDrop(event:React.DragEvent<HTMLDivElement>){
    event.stopPropagation();
    event.preventDefault();
    console.log(event.dataTransfer.files);

    let uploadedSamples:SampleData[] = []

    Array.from(event.dataTransfer.files).forEach((file)=>{
      uploadedSamples.push({ name: file.name})
    });

    props.onDropAccepted(uploadedSamples);

  }
  
  function handleDragOver(event:React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  return (
    <div className='rounded-md bg-slate-500/50 border-slate-500 border-2 border-dashed text-slate-500 p-4 mt-2' onDrop={processDrop} onDragOver={handleDragOver}>
      <props.Icon className=" block m-auto" width={100} />
      <p className=" text-center">{props.descriptionText}</p>
    </div>
  )
}
