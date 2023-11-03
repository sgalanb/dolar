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

export default function Header() {
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
      } bg-white transition-colors duration-200`}
    >
      <nav className="mx-auto w-full max-w-7xl">
        <div className="flex h-20 w-full items-center justify-between p-3 lg:hidden">
          <Link href="/">
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
