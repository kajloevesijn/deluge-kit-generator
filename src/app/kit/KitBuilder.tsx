import React from 'react';
import { SamplePanel } from './SamplePanel';

export const KitBuilder = () => {
    const sampleList = [1,2,3,4,5,6,7,8,9,10,11,12];

    type sampleData = {
        name: string
    }

  return (
    <div className="w-full backdrop-blur-md relative isolate overflow-hidden bg-gray-900/50 py-24 sm:py-32 rounded-xl">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8">
        <div className='ring-1 p-2 rounded-md bg-slate-600/50'>
        <div className="mx-auto grid grid-cols-1">
            {sampleList.map((listPos) =>{
                return<>
                    <SamplePanel key={listPos} sampleName={`test sample ${listPos}`}/>
                </>
            })}
        </div>
        </div>
      </div>
    </div>
  )
}
