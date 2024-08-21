'use client'

import TwitterButton from '@/components/TwitterButton'
import { Separator } from '@/components/ui/separator'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), {
  ssr: false,
})

export default function Footer() {
  return (
    <footer
      className={`sticky top-0 z-40 border-t
      border-zinc-200 bg-white backdrop-blur-md transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-950`}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-3 py-6">
        <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center justify-center gap-9 md:flex-row md:gap-0">
            <div className="flex flex-col items-center justify-center gap-1 md:items-start">
              <p className="text-lg">Seguí las cotizaciones en redes</p>
              <div className="flex items-center justify-center gap-6">
                <TwitterButton />
                <Link href="https://github.com/sgalanb/dolar" target="_blank">
                  <Image
                    src="/social-icons/github-icon.svg"
                    alt="icono de github"
                    width={20}
                    height={20}
                    className="hover:opacity-70 dark:invert"
                  />
                </Link>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <Separator className="my-0" />

        <div className="flex flex-col gap-1">
          <p className="w-full text-balance text-center text-sm text-black/50 dark:text-white/50">
            Los valores son meramente informativos y se basan en la información
            provista por cada proveedor.
          </p>
          <p className="w-full text-balance text-center text-sm text-black/50 dark:text-white/50">
            Hecho en Argentina por
            <Link href="https://x.com/sgalanb" target="_blank">
              <span className="text-blue-500 dark:text-blue-400">
                {' '}
                @sgalanb
              </span>
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
