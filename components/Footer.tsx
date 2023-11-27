'use client'

import InstagramButton from '@/components/InstagramButton'
import TwitterButton from '@/components/TwitterButton'
import { Separator } from '@/components/ui/separator'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), {
  ssr: false,
})

export default function Footer() {
  return (
    <footer
      className={`sticky top-0 z-40 border-t
      border-zinc-200 bg-white backdrop-blur-md transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-950`}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-3 py-7">
        <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center justify-center gap-9 md:flex-row md:gap-0">
            <div className="flex flex-col items-center justify-center gap-1 md:items-start">
              <p className="text-lg">Seguí las cotizaciones en redes</p>
              <div className="flex items-center justify-center gap-6">
                <TwitterButton />
                <InstagramButton />
              </div>
              <div className="flex flex-col items-center justify-center gap-1 pt-3 md:items-start">
                <p className="text-lg">Bajate la app con widgets</p>
                <div className="flex items-center justify-center gap-6">
                  <Link
                    href="https://apps.apple.com/ar/app/d%C3%B3larya-precio-del-d%C3%B3lar-hoy/id6472918637?platform=iphone"
                    className="flex h-8 items-center justify-center"
                    target="_blank"
                  >
                    <Image
                      src="/social-icons/apple-icon.svg"
                      alt="descárgalo en el app store"
                      width={20}
                      height={20}
                      className="hover:opacity-70 dark:invert"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <Separator className="my-0" />

        <div className="flex flex-col gap-1">
          <p className="w-full text-center text-sm text-black/50 dark:text-white/50">
            <Balancer>
              Los valores son meramente informativos y se basan en la
              información provista por cada proveedor.
            </Balancer>
          </p>
          <p className="w-full text-center text-sm text-black/50 dark:text-white/50">
            <Balancer>
              No garantizamos que el servicio sea ininterrumpido, rápido,
              preciso o libres de errores.
            </Balancer>
          </p>
        </div>
      </div>
    </footer>
  )
}
