'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const productos: { title: string; href: string; description: string }[] = [
  {
    title: 'Dólar MEP',
    href: '/dolar-mep',
    description:
      'Comprá y vendé dólares MEP cualquier día, a cualquier hora y con un botón.',
  },
  {
    title: 'Obligaciones Negociables',
    href: '/on',
    description: 'Opera obligaciones negociables en pesos o dólares.',
  },
  {
    title: 'CEDEARs',
    href: '/cedears',
    description:
      'Invertí en acciones extranjeras en pesos o dólares sin comisiones.',
  },
  {
    title: 'Bonos Públicos',
    href: '/bonos',
    description:
      'Financiá la deuda de una entidad pública y cobrá una renta fija.',
  },
  {
    title: 'Acciones',
    href: '/acciones',
    description: 'Invertí en acciones Argentinas sin comisiones.',
  },
  {
    title: 'Letras',
    href: '/letras',
    description:
      'Financiá una deuda pública a corto plazo y cobrá una renta fija.',
  },
  {
    title: 'Fondos Comunes de Inversión',
    href: '/fci',
    description: 'Invertí en fondos comunes de inversión en pesos o dólares.',
  },
  {
    title: 'Cauciones',
    href: '/cauciones',
    description:
      'Prestale dinero a otros inversores del mercado y recibí intereses a cambio.',
  },
]

const ayuda: { title: string; href: string; description: string }[] = [
  {
    title: 'Preguntas Frecuentes',
    href: '/preguntas-frecuentes',
    description:
      'Resolvemos todas tus dudas y te ayudamos a sacarle el máximo provecho a Cocos.',
  },
  {
    title: 'Transferencias',
    href: '/transferencias',
    description: 'Instrucciones para realizar transferencias.',
  },
  {
    title: 'Tarifas y Comisiones',
    href: '/tarifas-y-comisiones',
    description:
      'Conocé las tarifas y comisiones para operar en Cocos Capital.',
  },
]

const empresa: { title: string; href: string; description: string }[] = [
  {
    title: 'Quiénes Somos',
    href: '/quienes-somos',
    description: 'Conocé más sobre nosotros.',
  },
  {
    title: 'Trabajá Con Nosotros',
    href: 'https://cocoscapital.recruitee.com',
    description: 'Conocé las vacantes que tenemos disponibles.',
  },
]

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
        isScrolled ? 'border-gray-500/10' : 'border-transparent'
      } ${
        isOpenMobileHeader
          ? 'bg-white'
          : 'bg-white transition-colors duration-200'
      }`}
    >
      <nav className="mx-auto w-full max-w-7xl">
        <div className="flex h-20 w-full items-center justify-between p-3 lg:hidden">
          <Link href="/" onClick={() => setIsOpenMobileHeader(false)}>
            <p className="text-2xl font-bold">DolarYa</p>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Cotizaciones
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/calculadora" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Calculadora
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden h-20 w-full items-center justify-center p-3 lg:flex">
          <div className="flex gap-9">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Cotizaciones
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <Link href="/" className="px-8">
                  <p className="text-2xl font-bold">DolarYa</p>
                </Link>
                <NavigationMenuItem>
                  <Link href="/calculadora" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Calculadora
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </header>
  )
}
