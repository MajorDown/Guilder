import Footer from '@/components/landing/sections/Footer';
import Header from '@/components/landing/sections/Header'
import '@/styles/pages/landing/global.css'
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({weight: "400", subsets: ["latin"], display: 'swap', variable: "--font-Montserrat"});


export const metadata = {
  title: 'Agriguilder',
  description: 'Agriguilder est une application numérique digitalisant la gestion des échanges de travail et de matériel entre les agriculteurs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={montserrat.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
