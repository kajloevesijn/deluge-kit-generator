import React from "react";
import Link from "next/link";

export const DescriptiveButton = ({ ...props }) => {
  return (
    <>
      <Link
        aria-disabled={props.disabled}
        className="btn btn-primary backdrop-blur-sm"
        href={props.disabled == false ? props.link : "/"}
      >
        <button key={props.name} className="">
          <div className="p-4">
            <h2 className="font-bold underline-offset-2 text-primary-content ">
              {props.name}
            </h2>
            <p className="mt-4">{props.description}</p>
          </div>
        </button>
      </Link>
    </>
  );
};
