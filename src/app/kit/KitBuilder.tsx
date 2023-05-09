'use client'
import React,{useRef, useState} from 'react';
import { SamplePanel } from './SamplePanel';

export const KitBuilder = () => {
    const sampleList = useRef<sampleData[]>([]);

    const sampleTestCount = 10;

    type sampleData = {
        name: string
    }


    useState(()=>{
      for (let index = 0; index < sampleTestCount; index++) {
        let newData: sampleData = {
          name: (Math.random() * 1000000).toString() + '.wav'
        }
        sampleList.current.push(newData);
      }
  

    })

    function buttonHandler(action: string){
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

  return (
    <div className="w-full backdrop-blur-md relative isolate overflow-hidden bg-gray-900/50 py-24 sm:py-32 rounded-xl">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8">
        <div className='ring-1 p-2 rounded-md bg-slate-600/50'>
        <div className="mx-auto grid grid-cols-1">
            {sampleList.current.map((listPos) =>{
                return<>
                    <SamplePanel buttonHandler={buttonHandler} sampleName={`test sample ${listPos.name}`}/>
                </>
            })}
        </div>
        </div>
      </div>
    </div>
  )
}
