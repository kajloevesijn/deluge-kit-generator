'use client'
import React,{useEffect, useState} from 'react';
import { SamplePanel } from './SamplePanel';
import { FileDropArea } from '../components/FileDropArea';
import {FolderPlusIcon} from '@heroicons/react/24/solid';

export const KitBuilder = () => {
    const [sampleList, setSampleList] = useState<SampleData[]>([]);

    const sampleTestCount = 3;

    useEffect(()=>{

      let newData: SampleData[] = [];

      for (let index = 0; index < sampleTestCount; index++) {
        let sampleElement: SampleData = {
          name: (Math.random() * 1000000).toString() + '.wav'
        };
  
        newData.push(sampleElement);
      }

      setSampleList([...sampleList,  ...newData]);
    },[])

    function buttonHandler(action: string, data:SampleData){
      console.log(action);
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

    function addSamples(samples:SampleData[]){
      setSampleList([...sampleList, ...samples]);
    }

  return (
    <div className="w-full backdrop-blur-md relative isolate overflow-hidden bg-gray-900/50 py-24 sm:py-32 rounded-xl">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8">
        <div className='ring-1 p-2 rounded-md bg-slate-600/50'>
        <div className="mx-auto grid grid-cols-1">
            {sampleList.map((listPos, index) =>{
                return <div key={index}>
                    <SamplePanel  buttonHandler={buttonHandler} sampleName={`test sample ${listPos.name}`}/>
                  </div>
            })}
        </div>
        <FileDropArea onDropAccepted={addSamples} Icon={FolderPlusIcon} descriptionText="drag your .wav files of up to 10mb per file here" />
        </div>
      </div>
    </div>
  )
}
