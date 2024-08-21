'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function TwitterButton() {
  const handleTwitterButton = () => {
    if (
      typeof Tinybird !== 'undefined' &&
      Tinybird !== undefined &&
      Tinybird !== null
    ) {
      Tinybird.trackEvent('twitter_button', {})
    }
  }

  return (
    <Link href="https://x.com/dolarya_info" target="_blank">
      <Image
        src="/social-icons/x-icon.svg"
        alt="icono de x/twitter"
        width={18}
        height={18}
        className="hover:opacity-70 dark:invert"
        onClick={() => handleTwitterButton()}
      />
    </Link>
  )
}
