import React, { useEffect, useState } from 'react';

interface WaveFormDisplayProps {
  waveform: number[];
  progress: number;
  height: number;
  audioPlaying: boolean;
}

const WaveFormDisplay: React.FC<WaveFormDisplayProps> = ({waveform,progress,height,audioPlaying}) => {
  const progressIncrement = 100/waveform.length;

  useEffect(()=>{
    console.log(progress)
  },[progress])

  return (
    <div className='flex ml-8 mr-8'>
      {waveform &&
        waveform.map((value, index) => {
          console.log(waveform.length);
          if(index * progressIncrement <= progress && audioPlaying === true ){
            return(
              <div
              key={index}
              style={{ height: `${value * height}px` }}
              className={`rounded-sm w-1 m-0.5 bg-accent ring-2 ring-primary self-center select-none`}
            ></div>
            )
          }else{
            return(
              <div
              key={index}
              style={{ height: `${value * height}px` }}
              className={`rounded-sm w-1 m-0.5 bg-primary-content ring-2 ring-primary self-center select-none`}
            ></div>
            )
          }
        })}
    </div>
  );
}

export default WaveFormDisplay;