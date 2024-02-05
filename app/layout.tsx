import '../styles/globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PropsWithChildren } from 'react';
import { AdminProvider } from '@/contexts/adminContext';
import { MemberProvider } from '@/contexts/memberContext';
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
          <MemberProvider>
            <Header />
            <main>
              {props.children}
            </main>
            <Footer />
          </MemberProvider>
        </AdminProvider>
      </body>
    </html>
  )
}
