'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function OperaEnCocosButton({
  variant,
}: {
  variant?: 'button' | 'link'
}) {
  const handleCocosButton = () => {
    if (
      typeof Tinybird !== 'undefined' &&
      Tinybird !== undefined &&
      Tinybird !== null
    ) {
      Tinybird.trackEvent('cocos_button', {})
    }
  }

  return (
    <>
      {variant == 'button' ? (
        <Button asChild size="lg">
          <Link
            href="https://app.cocos.capital?ref=dolarya.info"
            target="_blank"
            className="w-fit !bg-cocos-600 hover:!bg-cocos-500  dark:!text-white"
            onClick={() => handleCocosButton()}
          >
            Operá en Cocos
          </Link>
        </Button>
      ) : (
        <Link
          href="https://app.cocos.capital?ref=dolarya.info"
          className="flex items-center justify-center gap-1 hover:underline"
          target="_blank"
          onClick={() => handleCocosButton()}
        >
          - Cocos Capital
        </Link>
      )}
    </>
  )
}
