import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'TodoNeon | Secure Task Manager',
  description: 'Full-stack CRUD task manager with Supabase Auth and RLS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans min-h-screen antialiased bg-zinc-950">
        {children}
      </body>
    </html>
  )
}
