import './globals.css'
import { Inter } from 'next/font/google'
import { Background } from './components/Background'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Deluge preset builder',
  description: 'A web application used to build kits, multisamples and presets for the synthstrom deluge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><Background/>{children}</body>
    </html>
  )
}
