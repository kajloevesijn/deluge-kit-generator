import React, { useEffect, useState } from "react";

interface WaveFormDisplayProps {
  waveform: number[];
  progress: number;
  height: number;
  audioPlaying: boolean;
}

const WaveFormDisplay: React.FC<WaveFormDisplayProps> = ({
  waveform,
  progress,
  height,
  audioPlaying,
}) => {
  const progressIncrement = 100 / waveform.length;

  useEffect(() => {

  }, [progress]);

  return (
    <div className="flex ml-8 mr-8">
      {waveform &&
        waveform.map((value, index) => {
          return (
            <div
              key={index}
              style={{ height: `${value * height}px` }}
              className={` ${ 
                (index * progressIncrement) - progressIncrement <= progress && audioPlaying === true
                  ? "bg-secondary"
                  : "ease-out duration-500 bg-primary-content/50 "
              } rounded-sm w-1 m-px self-center select-none`}
            ></div>
          );
        })}
    </div>
  );
};

export default WaveFormDisplay;
