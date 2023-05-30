declare interface SampleData {
  name: string;
  sampleCount: number;
  audioBuffer: AudioBuffer;
  waveformCache: number[];
  sampleLengthInSeconds: number;
  file: File;
}
