declare interface SampleData {
  name: string;
  sampleCount: number;
  audioBuffer: AudioBuffer;
  waveformCache: number[];
  sampleLengthInSeconds: number;
  category: string;
  file: File;
  uid: string;
}
