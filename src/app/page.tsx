import { Inter } from 'next/font/google'
import MainMenu from './components/MainMenu'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainMenu/>
    </main>
  )
}
