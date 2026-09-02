"use client";
import dynamic from "next/dynamic";

// The R3F canvas cannot be server-rendered (its reconciler only runs in the
// browser), so load it client-side only.
const BackgroundCanvas = dynamic(
  () => import("./BackgroundCanvas").then((m) => m.BackgroundCanvas),
  { ssr: false }
);

export const Background = () => {
  return <BackgroundCanvas />;
};
