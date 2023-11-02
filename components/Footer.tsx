'use client'

import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

export default function Footer() {
  return (
    <footer
      className={`sticky top-0 z-40 border-t
      border-gray-500/10 bg-white backdrop-blur-md transition-colors duration-200`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-3 py-7">
        <div className="flex w-full flex-col items-center justify-center gap-9 lg:flex-row lg:items-center lg:justify-center lg:gap-0">
          <div className="flex w-full flex-col items-center gap-9 lg:h-36 lg:justify-between lg:gap-0">
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-lg">Seguí las cotizaciones en redes</p>
              <div className="flex items-center justify-center gap-6">
                <Link href="/">
                  <Image
                    src="/social-icons/instagram-icon.svg"
                    alt="icono de instagram"
                    width={20}
                    height={20}
                    className="fill-zinc-600 hover:opacity-70"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src="/social-icons/x-icon.svg"
                    alt="icono de x/twitter"
                    width={20}
                    height={20}
                    className="fill-zinc-600 hover:opacity-70"
                  />
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-lg">Bajate la app y widgets</p>
              <div className="flex items-center justify-center gap-6">
                <Link href="/" className="flex h-8 items-center justify-center">
                  <Image
                    src="/social-icons/apple-icon.svg"
                    alt="descárgalo en google play"
                    width={20}
                    height={20}
                    className="fill-zinc-600 hover:opacity-70"
                  />
                </Link>
                <Link href="/" className="flex h-8 items-center justify-center">
                  <Image
                    src="/social-icons/android-icon.svg"
                    alt="descárgalo en el app store"
                    width={20}
                    height={20}
                    className="fill-zinc-600 hover:opacity-70"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-0" />

        <div className="flex flex-col gap-1">
          <p className="w-full text-center text-sm text-zinc-600">
            <Balancer>
              Los valores son meramente informativos y se basan en la
              información provista por cada proveedor.
            </Balancer>
          </p>
          <p className="w-full text-center text-sm text-zinc-600">
            <Balancer>
              No garantizamos que el servicios sean ininterrumpidos, rápidos,
              precisos o libres de errores.
            </Balancer>
          </p>
        </div>
      </div>
    </footer>
  )
}
