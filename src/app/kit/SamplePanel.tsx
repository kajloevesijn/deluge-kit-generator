"use client";
import React, { useEffect, useRef, useState } from "react";
import { PlayIcon, StopIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { IconButton } from "../components/IconButton";
import { useSampleContext } from "../components/contexts/SampleContext";
import WaveFormDisplay from "../components/audio/WaveformDisplay";
import useAudioPlayer from "../components/audio/useAudioPlayer";
import { TextInputField } from "../components/TextInputField";

export const SamplePanel = ({ ...props }) => {
  const { sampleList, removeSample } = useSampleContext();
  const [playProgress, setPlayProgress] = useState(0);
  const { playAudio, stopAudio, isAudioPlaying } = useAudioPlayer();

  const playInterval = useRef<NodeJS.Timer>();

  function onPlaySample() {
    setPlayProgress(-1);
    playAudio(sampleList[props.index].audioBuffer);
    playInterval.current = setInterval(incrementProgress, 10);
  }

  function onStopSample() {
    setPlayProgress(-1);
    clearInterval(playInterval.current);
    stopAudio();
  }

  function incrementProgress() {
    setPlayProgress((prevProgress) => {
      let nextProgress =
        prevProgress + 1 / sampleList[props.index].sampleLengthInSeconds;
      if (nextProgress >= 100) {
        clearInterval(playInterval.current);
      }
      return nextProgress;
    });
  }

  function removeSamplePanel() {
    clearInterval(playInterval.current);
    removeSample(props.index);
  }

  function updateCategory(value:string){
    sampleList[props.index].category = value;
  }

  useEffect(() => {
    return () => clearInterval(playInterval.current);
  }, []);

  return (
    <div
      className={`flex items-center p-2 gap-2 border-2 bg-base-300/50 active:bg-base-300/30 border-primary rounded-lg  backdrop-blur-sm m-0.5 ring-0 hover:ring-2 ring-primary hover:ring-primary-focus transition hover:border-primary-focus ${
        props.isDragging
          ? "active:drop-shadow-hard active:-translate-x-2 active:backdrop-blur-md active:-translate-y-2 active:border-primary-content"
          : ""
      } `}
    >
      
      {isAudioPlaying() !== true && (
        <IconButton
          buttonHandler={onPlaySample}
          index={props.index}
          buttonSize={40}
          Icon={PlayIcon}
        />
      )}
      {isAudioPlaying() === true && (
        <IconButton
          buttonHandler={onStopSample}
          index={props.index}
          buttonSize={40}
          Icon={StopIcon}
        />
      )}

      <p className="text-base-content font-mono">{(props.index + 1).toString() + ":"}</p>

      <p className="grow truncate text-base-content select-none font-mono">
        {props.sampleName}
      </p>
      <WaveFormDisplay
        waveform={sampleList[props.index].waveformCache}
        progress={playProgress}
        height={40}
        audioPlaying={isAudioPlaying()}
      />
      <div className="tooltip" data-tip="sample directory">
      <TextInputField prefix="" inputDefault={sampleList[props.index].category} customDivClass={'mr-8'} customPrefixClass={'mr-2'} valueChanged={updateCategory} customInputClass={'w-40 h-8'}/>
      </div>
      <div className="tooltip" data-tip="delete from list">
      <IconButton
        buttonHandler={removeSamplePanel}
        index={props.index}
        buttonSize={40}
        Icon={XMarkIcon}
      />
      </div>
    </div>
  );
};
