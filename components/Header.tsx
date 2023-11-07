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
        isScrolled
          ? 'border-gray-500/10 bg-white dark:border-zinc-800'
          : 'border-transparent bg-zinc-100'
      } transition-colors duration-200 dark:bg-zinc-950`}
    >
      <nav className="mx-auto w-full max-w-3xl">
        <div className="flex h-fit items-center justify-between py-3 pl-3 pr-0 lg:hidden">
          <div className="flex w-full flex-col items-start justify-between">
            <Link href="/">
              <p className="text-3xl font-bold tracking-tighter">DólarYa</p>
            </Link>
            <p className="hidden text-3xl font-bold tracking-tighter text-zinc-500 xxs:flex">
              {dayjs().format('D MMMM')}
            </p>
          </div>
          <MenuToggle
            toggle={() => setIsOpenMobileHeader(!isOpenMobileHeader)}
            isOpen={isOpenMobileHeader}
          />
        </div>

        <div className="hidden h-20 w-full items-center justify-between p-3 lg:flex">
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
