import '@/styles/globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { AdminProvider } from '@/contexts/adminContext';
import { MemberProvider } from '@/contexts/memberContext';
import SectionsBackground from '@/components/SectionsBackground';
import { Montserrat } from 'next/font/google';
import { ManagerProvider } from '@/contexts/managerContext';
import { GuildConfigProvider } from '@/contexts/guildConfigContext';
const montserrat = Montserrat({weight: "400", subsets: ["latin"], display: 'swap', variable: "--font-Montserrat"});

export const metadata: Metadata = {
  title: 'Agriguilder',
  description: "Application de gestion de compteurs d'heures au sein de collectifs dont l'objectif est l'entraide",  
}

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16" />
      </head>
      <body className={montserrat.className}>
        <ManagerProvider>
          <AdminProvider>
            <MemberProvider>
              <GuildConfigProvider>
                <Header />
                <main>
                  <SectionsBackground />
                  {props.children}
                </main>
                <Footer />
              </GuildConfigProvider>
            </MemberProvider>
          </AdminProvider>
        </ManagerProvider>
      </body>
    </html>
  )
}
