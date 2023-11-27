'use client'

import { track } from '@vercel/analytics/react'
import Image from 'next/image'
import Link from 'next/link'

export default function AppStoreButton() {
  return (
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
        onClick={() => track('Button | App Store')}
      />
    </Link>
  )
}
