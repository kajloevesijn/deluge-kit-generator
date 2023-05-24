"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SampleContextData {
  sampleList: SampleData[];
  addSamples: (samples: SampleData[]) => void;
}

// Define the context
export const SampleContext = createContext<SampleContextData | undefined>(undefined);

// Define a provider that shares state
export const SampleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sampleList, setSampleList] = useState<SampleData[]>([]);

  const addSamples = (samples: SampleData[]) => {
    setSampleList(prevSamples => [...prevSamples, ...samples]);
  };

  // Provide state and methods to children
  return (
    <SampleContext.Provider value={{ sampleList, addSamples }}>
      {children}
    </SampleContext.Provider>
  );
};

// Define a custom hook to easily use this context
export const useSampleContext = (): SampleContextData => {
  const context = useContext(SampleContext);
  
  if (!context) {
    throw new Error('useSampleContext must be used within a SampleProvider');
  }
  
  return context;
};