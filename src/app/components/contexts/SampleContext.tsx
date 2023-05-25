"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SampleContextData {
  sampleList: SampleData[];
  addSamples: (sample: SampleData) => void;
  rebuildList: (newList: SampleData[]) => void;
  removeSample: (index: number) => void;
  playSample: (index: number) => void;
}

// Define the context
export const SampleContext = createContext<SampleContextData | undefined>(
  undefined
);

// Define a provider that shares state
export const SampleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sampleList, setSampleList] = useState<SampleData[]>([]);

  const addSamples = (sample: SampleData) => {
    setSampleList((prevSamples) => [...prevSamples, sample]);
  };

  const removeSample = (index: number) => {
    const reorderedSamples = [...sampleList];
    reorderedSamples.splice(index, 1);
    rebuildList(reorderedSamples);
  };

  const playSample = (index: number) => {
    console.log(index);
  };

  const rebuildList = (newList: SampleData[]) => {
    setSampleList(newList);
  };

  // Provide state and methods to children
  return (
    <SampleContext.Provider
      value={{ sampleList, addSamples, rebuildList, removeSample, playSample }}
    >
      {children}
    </SampleContext.Provider>
  );
};

// Define a custom hook to easily use this context
export const useSampleContext = (): SampleContextData => {
  const context = useContext(SampleContext);

  if (!context) {
    throw new Error("useSampleContext must be used within a SampleProvider");
  }

  return context;
};
