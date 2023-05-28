import Link from "next/link";
import { DescriptiveButton } from "./DescriptiveButton";

const buttons = [
  {
    name: "KIT",
    link: "/kit",
    disabled: false,
  },
  {
    name: "Multisample (disabled)",
    link: "/multisample",
    disabled: true,
  },
];

export default function MainMenu() {
  return (
    <>
      <div className="card">
        <div className=" mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto text-center max-w-none lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-primary-content sm:text-6xl ">
              Deluge preset builder
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-content">
              Hi! Welcome to the Deluge preset builder, Click on one of the
              options below to start.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-8">
            {buttons.map((button) => (
              <DescriptiveButton
                name={button.name}
                link={button.link}
                disabled={button.disabled}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
