'use client'

import { track } from '@vercel/analytics/react'
import Image from 'next/image'
import Link from 'next/link'

export default function InstagramButton() {
  return (
    <Link href="https://www.instagram.com/dolarya.info/" target="_blank">
      <Image
        src="/social-icons/instagram-icon.svg"
        alt="icono de instagram"
        width={20}
        height={20}
        className="hover:opacity-70 dark:invert"
        onClick={() => track('Button | Instagram @dolarya.info')}
      />
    </Link>
  )
}
