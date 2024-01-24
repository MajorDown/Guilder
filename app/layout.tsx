import '../styles/globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PropsWithChildren } from 'react';
import { AdminProvider } from '@/contexts/adminContext';
import { UserProvider } from '@/contexts/userContext';
import { GuildProvider } from '@/contexts/guildContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'
const inter = Inter({subsets: ['latin'], display: 'swap'})

export const metadata: Metadata = {
  title: 'Guilder',
  description: "Application de gestion de compteurs d'heures au sein de collectifs dont l'objectif est l'entraide",
}

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="fr">
      <head>
      </head>
      <body className={inter.className}>
        <AdminProvider>
          <UserProvider>
            <GuildProvider>
              <Header />
              <main>
                {props.children}
              </main>
              <Footer />
            </GuildProvider>
          </UserProvider>
        </AdminProvider>
      </body>
    </html>
  )
}
