import Header from '@/components/landing/sections/Header'
import '@/styles/pages/landing/global.css'

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
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
