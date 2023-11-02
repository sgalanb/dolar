'use client'

import { MenuToggle } from '@/components/MenuToggle'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Image from 'next/image'
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
        <div className="flex h-20 w-full items-center justify-between py-3 pl-3 lg:hidden">
          <Link href="/" onClick={() => setIsOpenMobileHeader(false)}>
            <Image
              src={'/bills.png'}
              alt="cocos capital logo"
              width={78}
              height={55.11}
            />
          </Link>

          <div className="flex items-center justify-center gap-3">
            <MenuToggle
              toggle={() => setIsOpenMobileHeader(!isOpenMobileHeader)}
              isOpen={isOpenMobileHeader}
            />
          </div>
          {isOpenMobileHeader && (
            <div className="absolute left-0 top-20 z-50 w-full flex-col bg-white p-3 lg:hidden">
              <Accordion type="single" collapsible className="w-full">
                <Link href="/" className="w-full xxs:hidden">
                  <div
                    className="border-b border-gray-200 py-4 text-sm font-medium"
                    onClick={() => setIsOpenMobileHeader(false)}
                  >
                    Inicio
                  </div>
                </Link>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Productos</AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-3 pl-2">
                      {productos.map((component) => (
                        <Link
                          href={component.href}
                          key={component.title}
                          className=""
                          onClick={() => setIsOpenMobileHeader(false)}
                        >
                          {component.title}
                        </Link>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Ayuda</AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-3 pl-2">
                      {ayuda.map((component) => (
                        <Link
                          href={component.href}
                          key={component.title}
                          className=""
                          onClick={() => setIsOpenMobileHeader(false)}
                        >
                          {component.title}
                        </Link>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Empresa</AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-3 pl-2">
                      {empresa.map((component) => (
                        <>
                          {component.href ===
                          'https://cocoscapital.recruitee.com' ? (
                            <Link
                              href={component.href}
                              key={component.title}
                              className=""
                              rel="noopener"
                              target="_blank"
                            >
                              {component.title}
                            </Link>
                          ) : (
                            <Link
                              href={component.href}
                              key={component.title}
                              className=""
                              onClick={() => setIsOpenMobileHeader(false)}
                            >
                              {component.title}
                            </Link>
                          )}
                        </>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <Link
                  href="https://university.cocos.capital/"
                  className="w-full"
                  rel="noopener"
                  target="_blank"
                >
                  <div
                    className="border-b border-gray-200 py-4 text-sm font-medium"
                    onClick={() => setIsOpenMobileHeader(false)}
                  >
                    Cocos University
                  </div>
                </Link>
                <Link href="/gold">
                  <div
                    className=" py-4 text-sm font-medium"
                    onClick={() => setIsOpenMobileHeader(false)}
                  >
                    Cocos Gold
                  </div>
                </Link>
              </Accordion>
            </div>
          )}
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
