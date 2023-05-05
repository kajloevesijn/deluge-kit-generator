import Link from 'next/link';
import { DescriptiveButton } from './DescriptiveButton';

const buttons = [
  {
    name: 'KIT',
    description: 'Click here to start building your KIT preset for the Deluge',
    link:"/kit"
  },
  {
    name: 'Multisample',
    description: 'Click here to start building your Multisample preset for the Deluge',
    link:"/multisample"
  },
]

export default function MainMenu() {
  return (
    <>
    <div className="backdrop-blur-md relative isolate overflow-hidden bg-gray-900/50 py-24 sm:py-32 rounded-xl">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-center max-w-none lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Deluge preset builder</h2>
          <p className="mt-6 text-lg leading-8 text-gray-400">
          Hi! Welcome to the Deluge preset builder,
          Click on one of the options below to start.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-8">
          {buttons.map((button) => (
            <DescriptiveButton name={button.name} link={button.link} description={button.description} />
          ))}
        </div>
      </div>
    </div>
    </>
  )
}