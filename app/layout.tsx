import './globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Guilder',
  description: "Application de gestion de compteurs d'heures au sein de collectifs dont l'objectif est l'entraide",
}

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <main>
          {props.children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
