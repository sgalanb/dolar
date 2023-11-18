import { Providers } from '@/app/providers'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DólarYa | Precio del dólar hoy en Argentina',
  description:
    'La forma más fácil de seguir las cotizaciones del dólar en Argentina y conocer valores históricos. Todo en tiempo real y sin publicidad.',
  manifest: `https://www.dolarya.info/site.webmanifest`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${GeistSans.className}`}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col justify-between bg-zinc-100 text-black dark:bg-zinc-950 dark:text-white">
            <div className="flex flex-col justify-start">
              <Header />
              <main className="mx-auto w-full max-w-3xl px-3 pb-9 pt-3">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
