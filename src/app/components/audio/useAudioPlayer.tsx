import { useState, useEffect } from 'react';

// Define a React Hook for playing audio
const useAudioPlayer = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [source, setSource] = useState<AudioBufferSourceNode | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const context = new AudioContext();
    setAudioContext(context);

    return () => {
      context.close();
    };
  }, []);

  const stopAudio = () => {
    source?.stop();
    source?.disconnect();
    setSource(null);
    setIsPlaying(false);
  }

  const playAudio = (audioBuffer: AudioBuffer) => {
    if (!audioContext) return;
    source?.disconnect();

    const src = audioContext.createBufferSource();
    src.buffer = audioBuffer;
    src.connect(audioContext.destination);
    src.start();

    // Handle when the audio naturally finishes playing
    src.onended = () => {
      setIsPlaying(false);
    };

    setSource(src);
    setIsPlaying(true);
  };

  const isAudioPlaying = () => {
    return isPlaying;
  }

  return { playAudio, stopAudio, isAudioPlaying };
};

export default useAudioPlayer;