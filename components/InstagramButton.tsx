'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function InstagramButton() {
  const handleInstagramButton = () => {
    if (
      typeof Tinybird !== 'undefined' &&
      Tinybird !== undefined &&
      Tinybird !== null
    ) {
      Tinybird.trackEvent('instagram_button', {})
    }
  }

  return (
    <Link href="https://www.instagram.com/dolarya.info/" target="_blank">
      <Image
        src="/social-icons/instagram-icon.svg"
        alt="icono de instagram"
        width={20}
        height={20}
        className="hover:opacity-70 dark:invert"
        onClick={() => handleInstagramButton()}
      />
    </Link>
  )
}
