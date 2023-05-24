'use client'
import React,{useEffect,useState, useRef} from 'react';
import { SamplePanel } from './SamplePanel';
import { FileDropArea } from '../components/FileDropArea';
import {FolderPlusIcon} from '@heroicons/react/24/solid';
import { useSampleContext } from '../components/contexts/SampleContext';
import { DragDropContext, Droppable, Draggable, DropResult,  } from '@hello-pangea/dnd'; 

export const KitBuilder = () => {
    const { sampleList, addSamples } = useSampleContext();

    function buttonHandler(action: string, index:number){
      console.log(action, index);
      switch (action) {
        case 'up':
          
          break;

          case 'down':

          break;

          case 'play':
          
          break;

          case 'delete':

          break;
      
        default:
          break;
      }
    } 

  function dragEnded(result:DropResult){
    console.log(result);
  }

  return (
    <div className="w-full backdrop-blur-md relative isolate overflow-hidden bg-gray-900/50 py-24 sm:py-32 rounded-xl">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8">
        <div className='ring-1 p-2 rounded-md bg-slate-600/50'>
        <DragDropContext onDragEnd={dragEnded}>

          <Droppable droppableId={'sampleList'}>
            {(provided) =>(
              <div className="mx-auto grid grid-cols-1" {...provided.droppableProps} ref={provided.innerRef}>
                {sampleList.map((listPos, index) =>(
                  <Draggable draggableId={index.toString()} key={index} index={index}>
                    {(provided =>(
                      <div key={index} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                        <SamplePanel  buttonHandler={buttonHandler} index={index} sampleName={`test sample ${listPos.name}`}/>
                      </div>
                    ))}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <FileDropArea onDropAccepted={addSamples} Icon={FolderPlusIcon} descriptionText="drag your .wav files of up to 10mb per file here" />
        </div>
      </div>
    </div>
  )
}