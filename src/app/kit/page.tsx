import { Inter } from "next/font/google";
import { KitBuilder } from "./KitBuilder";
import { SampleProvider } from "../components/contexts/SampleContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <SampleProvider>
      <main className="flex min-h-screen flex-col bg-base-100 select-none">
        <div className="self-center">
        <KitBuilder />
        </div>
      </main>
    </SampleProvider>
  );
}
