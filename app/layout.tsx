import '../styles/globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PropsWithChildren } from 'react';
import { AdminProvider } from '@/contexts/adminContext';
import { MemberProvider } from '@/contexts/memberContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({weight: "400", subsets: ["latin"], display: 'swap', variable: "--font-Montserrat"});
import SectionsBackground from '@/components/SectionsBackground';
const inter = Inter({weight: "400", subsets: ["latin"], display: 'swap', variable: "--font-Inter"});

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
              <SectionsBackground />
              {props.children}
            </main>
            <Footer />
          </MemberProvider>
        </AdminProvider>
      </body>
    </html>
  )
}
