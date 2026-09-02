import { useState, useEffect, useRef } from 'react';

// Define a React Hook for playing audio
const useAudioPlayer = () => {
  // The AudioContext is only read inside event callbacks, never rendered, so a
  // ref avoids the setState-in-effect cascade (and keeps StrictMode honest).
  const audioContextRef = useRef<AudioContext | null>(null);
  const [source, setSource] = useState<AudioBufferSourceNode | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const context = new AudioContext();
    audioContextRef.current = context;

    return () => {
      context.close();
      audioContextRef.current = null;
    };
  }, []);

  const stopAudio = () => {
    source?.stop();
    source?.disconnect();
    setSource(null);
    setIsPlaying(false);
  }

  const playAudio = (audioBuffer: AudioBuffer) => {
    const audioContext = audioContextRef.current;
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