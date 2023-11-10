'use client'

import { MenuToggle } from '@/components/MenuToggle'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import updateLocale from 'dayjs/plugin/updateLocale'
import Link from 'next/link'
import { useEffect, useState } from 'react'
dayjs.extend(updateLocale)
dayjs.locale('es')
dayjs.updateLocale('es', {
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
})

export default function Header() {
  const [isOpenMobileHeader, setIsOpenMobileHeader] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Clean up the listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b ${
        isScrolled || isOpenMobileHeader
          ? 'border-gray-500/10 bg-white dark:border-zinc-800'
          : 'border-transparent bg-zinc-100'
      } transition-colors duration-200 dark:bg-zinc-950`}
    >
      <nav className="mx-auto w-full max-w-3xl">
        <div className="flex h-fit items-center justify-between py-3 pl-3 pr-0 md:hidden">
          <div className="flex w-full flex-col items-start justify-between">
            <Link href="/">
              <p className="text-2xl font-bold tracking-tighter">DólarYa</p>

              <p className="text-2xl font-bold tracking-tighter text-zinc-500">
                {dayjs().format('D MMMM')}
              </p>
            </Link>
          </div>
          <MenuToggle
            toggle={() => setIsOpenMobileHeader(!isOpenMobileHeader)}
            isOpen={isOpenMobileHeader}
          />
        </div>
        {isOpenMobileHeader && (
          <div className="absolute left-0 top-20 z-50 w-full flex-col bg-white p-3 dark:bg-zinc-950 lg:hidden">
            <Link href="/" className="w-full">
              <div
                className="border-b border-gray-200 py-4 text-sm font-medium"
                onClick={() => setIsOpenMobileHeader(false)}
              >
                Inicio
              </div>
            </Link>
            <Link href="/oficial" className="w-full">
              <div
                className="border-b border-gray-200 py-4 text-sm font-medium"
                onClick={() => setIsOpenMobileHeader(false)}
              >
                Dólar Oficial
              </div>
            </Link>
            <Link href="/blue" className="w-full">
              <div
                className="border-b border-gray-200 py-4 text-sm font-medium"
                onClick={() => setIsOpenMobileHeader(false)}
              >
                Dólar Blue
              </div>
            </Link>
            <Link href="/mep" className="w-full">
              <div
                className="border-b border-gray-200 py-4 text-sm font-medium"
                onClick={() => setIsOpenMobileHeader(false)}
              >
                Dólar MEP
              </div>
            </Link>
            <Link href="/cocos" className="w-full">
              <div
                className="border-b border-gray-200 py-4 text-sm font-medium"
                onClick={() => setIsOpenMobileHeader(false)}
              >
                Dólar Cocos
              </div>
            </Link>
            <Link href="/tarjeta" className="w-full">
              <div
                className="border-b border-gray-200 py-4 text-sm font-medium"
                onClick={() => setIsOpenMobileHeader(false)}
              >
                Dólar Tarjeta
              </div>
            </Link>
            <Link href="/mayorista" className="w-full">
              <div
                className="border-b border-gray-200 py-4 text-sm font-medium"
                onClick={() => setIsOpenMobileHeader(false)}
              >
                Dólar Mayorista
              </div>
            </Link>
            <Link href="/ccl" className="w-full">
              <div
                className="border-b border-gray-200 py-4 text-sm font-medium"
                onClick={() => setIsOpenMobileHeader(false)}
              >
                Dólar CCL
              </div>
            </Link>
            <Link href="/cripto" className="w-full">
              <div
                className="border-b border-gray-200 py-4 text-sm font-medium"
                onClick={() => setIsOpenMobileHeader(false)}
              >
                Dólar Cripto
              </div>
            </Link>
          </div>
        )}

        <div className="hidden h-20 w-full items-center justify-between p-3 md:flex">
          <Link href="/" className="">
            <p className="text-3xl font-bold tracking-tighter">DólarYa</p>
          </Link>
          <p className="text-3xl font-bold tracking-tighter text-zinc-500">
            {dayjs().format('D MMMM')}
          </p>
        </div>
      </nav>
    </header>
  )
}
