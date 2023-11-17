'use client'

import { track } from '@vercel/analytics/react'
import Image from 'next/image'
import Link from 'next/link'

export default function TwitterButton() {
  return (
    <Link href="https://x.com/dolarya_info" target="_blank">
      <Image
        src="/social-icons/x-icon.svg"
        alt="icono de x/twitter"
        width={20}
        height={20}
        className="hover:opacity-70 dark:invert"
        onClick={() => track('Button | Twitter @dolarya_info')}
      />
    </Link>
  )
}
