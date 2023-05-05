import React from 'react'
import Link from 'next/link';

type DescriptiveButtonProps = {
    [key: string]: string
}

export const DescriptiveButton = (props: DescriptiveButtonProps) => {
  return (
    <button key={props.name} className="transition ease-in-out duration-150 active:duration-0 active:shadow-inner hover:shadow-md active:text-white hover:-translate-y-1 active:translate-y-0 active:bg-white/10 active:scale-100 gap-x-4 rounded-xl bg-white/5 hover:ring-2 ring-1 ring-inset ring-white/10">
        <Link className='' href={props.link}>
            <div className="text-base p-6 leading-7">
                <h3 className="font-semibold text-white">{props.name}</h3>
                <p className="mt-2 text-gray-400">{props.description}</p>
            </div>
        </Link>
    </button>
  )
}
