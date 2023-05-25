import React from "react";
import { FolderPlusIcon } from "@heroicons/react/24/solid";
import { arrayBuffer } from "stream/consumers";
export const FileDropArea = ({ ...props }) => {
  function processDrop(event: React.DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
    console.log(event.dataTransfer.files);
    let offlineContext = new OfflineAudioContext(2, 48000 * 40, 48000);

    let acceptedSample: SampleData;

    Array.from(event.dataTransfer.files).forEach((file, index) => {
      if (file.type !== "audio/wav") {
        console.log("file is of the wrong format");
        return;
      }

      if (file.size >= 10000000) {
        console.log("file is too large.");
        return;
      }

      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (e.target?.result instanceof ArrayBuffer) {
          offlineContext
            .decodeAudioData(e.target.result)
            .then((buffer: AudioBuffer) => {
              acceptedSample = {
                name: file.name,
                sampleCount: buffer.length,
                audioBuffer: buffer,
              };
              props.onDropAccepted(acceptedSample);
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
  }

  return (
    <div
      className="rounded-xl bg-neutral/50 border-primary border-2 border-dashed text-neutral-content backdrop-blur-md p-4"
      onDrop={processDrop}
      onDragOver={handleDragOver}
    >
      <props.Icon className=" block m-auto" width={100} />
      <p className=" text-center">{props.descriptionText}</p>
    </div>
  );
};
