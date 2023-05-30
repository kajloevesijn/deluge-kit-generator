"use client";
import React, { useEffect, useState, useRef } from "react";
import { SamplePanel } from "./SamplePanel";
import { FileDropArea } from "../components/FileDropArea";
import { FolderPlusIcon } from "@heroicons/react/24/solid";
import { useSampleContext } from "../components/contexts/SampleContext";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
} from "@hello-pangea/dnd";
import { DescriptiveButton } from "../components/DescriptiveButton";
import { createExport } from "../components/FileZipper";
import export_kit from "../components/KitExporter";

export const KitBuilder = () => {
  const { sampleList, addSamples, rebuildList } = useSampleContext();
  let dragging = false;

  function dragEnded(result: DropResult) {
    const { source, destination, type } = result;
    dragging = false;

    if (source.index === destination?.index) {
      return;
    }

    if (type === "DEFAULT" && destination) {
      const reorderedSamples = [...sampleList];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedSample] = reorderedSamples.splice(sourceIndex, 1);
      reorderedSamples.splice(destinationIndex, 0, removedSample);
      rebuildList(reorderedSamples);
    }
  }

  function dragStarted(result: DragStart) {
    dragging = true;
  }

  return (
    <>
      <div className="flex my-4 align-middle items-center">
        <DescriptiveButton name="BACK" link="/" />
        <div className="grow">
          <p className="text-base-content align-middle text-center h-full font-bold text-2xl select-none">
            KIT
          </p>
        </div>
        <button
          className="btn btn-md btn-primary z-10"
          onClick={() => {
            export_kit(sampleList);
          }}
        >
          export kit
        </button>
        {/* TODO: when re-occuring, create a new react component for this button */}
      </div>

      <div className="card card-bordered w-full bg-base-100/20">
        <div className="p-2">
          <DragDropContext onDragEnd={dragEnded} onDragStart={dragStarted}>
            <Droppable droppableId={"sampleList"}>
              {(provided) => (
                <div
                  className=" mx-auto grid grid-cols-1 transition "
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {sampleList.map((listPos, index) => (
                    <Draggable
                      draggableId={index.toString()}
                      key={index}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          key={index}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <SamplePanel
                            isDragging={snapshot.isDragging}
                            index={index}
                            sampleName={listPos.name}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {sampleList.length !== 0 && <div className="m-0.5"></div>}
          <FileDropArea
            onDropAccepted={addSamples}
            Icon={FolderPlusIcon}
            descriptionText="drag your .wav files of up to 10mb per file here"
          />
        </div>
      </div>
    </>
  );
};
