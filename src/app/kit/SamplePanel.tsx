"use client";
import React from "react";
import {
  PlayIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { IconButton } from "../components/IconButton";
import { useSampleContext } from "../components/contexts/SampleContext";

export const SamplePanel = ({ ...props }) => {
  const { removeSample, playSample } = useSampleContext();

  return (
    <div className=" flex items-center p-2 gap-2 border-2 bg-neutral/50 hover:bg-neutral/30 border-primary rounded-lg backdrop-blur-sm m-0.5 hover:-translate-y-0.5 transition hover:drop-shadow-md">
      <IconButton
        buttonHandler={() => playSample(props.index)}
        index={props.index}
        buttonSize={40}
        Icon={PlayIcon}
      />
      <p className="grow truncate text-white">{props.sampleName}</p>
      <IconButton
        buttonHandler={() => removeSample(props.index)}
        index={props.index}
        buttonSize={40}
        Icon={XMarkIcon}
      />
    </div>
  );
};
