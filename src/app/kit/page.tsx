import { Inter } from 'next/font/google'
import { KitBuilder } from './KitBuilder'
import { SampleProvider } from '../components/contexts/SampleContext'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <SampleProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <KitBuilder/>
    </main>
    </SampleProvider>
  )
}
