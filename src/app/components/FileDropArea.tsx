import React, {useState,useEffect} from "react";
import { processAudioBuffer } from "./audio/WaveformRenderer";
import { v4 as uuidv4 } from 'uuid';
import { useSampleContext } from "../components/contexts/SampleContext";

export const FileDropArea = ({ ...props }) => {
  const [draggingOver, setDraggingOver] = useState(false);
  const {sampleList} = useSampleContext();

  const [error, setError] = useState("");
  const [errorResetIntervalId, setErrorResetIntervalId] = useState<number | null>(null);

  useEffect(() => {
    if (error !== "") {
      const intervalId = window.setInterval(() => {
        setError("");
      }, 5000);
      setErrorResetIntervalId(intervalId);
    }

    return () => {
      if (errorResetIntervalId !== null) {
        window.clearInterval(errorResetIntervalId);
      }
    }
  }, [error]);

  function processDrop(event: React.DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
    setError("");

    let offlineContext = new OfflineAudioContext(2, 48000 * 40, 48000);
    let acceptedSample: SampleData;

    Array.from(event.dataTransfer.files).forEach((file, index) => {
      if (file.type !== "audio/wav") {
        console.log("one of your files was of the wrong format, please ensure you're uploading .wav files only");
        setError("one of your files was of the wrong format, please ensure you're uploading .wav files only")
        return;
      }

      if (file.size >= 10000000) {
        setError("one of your files was too large.");
        return;
      }

      for (let index = 0; index < sampleList.length; index++) { //TODO: don't exit immediately, first go through all files, add their names to a list, and display the offending files in the console log.
        if(sampleList[index].name === file.name){
          setError("Can't add files with identical names.");
          return;
        }
      }

      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (e.target?.result instanceof ArrayBuffer) {
          offlineContext
            .decodeAudioData(e.target.result)
            .then((buffer: AudioBuffer) => {
              processAudioBuffer(buffer, 50).then((averages) => {
                acceptedSample = {
                  name: file.name,
                  sampleCount: buffer.length,
                  audioBuffer: buffer,
                  waveformCache: averages,
                  sampleLengthInSeconds: buffer.duration,
                  category: "default",
                  file: file,
                  uid: uuidv4(),
                };
                props.onDropAccepted(acceptedSample);
              });
            })
            .catch((err: DOMException) => {
              console.error(`Error with decoding audio data: ${err}`);
            });
        }
      };

      reader.readAsArrayBuffer(file);
    });
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDraggingOver(false);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    setDraggingOver(true);
  }

  return (
    <div
      className="rounded-xl bg-base-300/50 border-primary border-2 border-dashed text-base-content backdrop-blur-sm p-8"
      onDrop={processDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className={`  `}>
      <props.Icon className={`block m-auto`} width={100} />
      <p className={`text-center  select-none ${error != "" ? "text-error" : "duration-500"}`}>{error != "" ? error : props.descriptionText}</p>
      </div>

    </div>
  );
};
