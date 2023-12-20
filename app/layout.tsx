import '../styles/globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PropsWithChildren } from 'react';
import { UserProvider } from '@/contexts/userContext';
import type { Metadata } from 'next';
import { Amiri_Quran } from 'next/font/google';
const amiri = Amiri_Quran({weight: "400", subsets: ['latin']});


export const metadata: Metadata = {
  title: 'Guilder',
  description: "Application de gestion de compteurs d'heures au sein de collectifs dont l'objectif est l'entraide",
}

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="fr">
      <head>
      </head>
      <body className={amiri.className}>
      <UserProvider>
          <Header />
          <main>
            {props.children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}
