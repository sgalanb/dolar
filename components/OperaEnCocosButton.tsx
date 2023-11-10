'use client'

import { Button } from '@/components/ui/button'
import { track } from '@vercel/analytics/react'
import Link from 'next/link'

export default function OperaEnCocosButton() {
  return (
    <Button asChild>
      <Link
        href="https://app.cocos.capital?ref=dolarya.info"
        target="_blank"
        className="!bg-cocos-600 hover:!bg-cocos-500 dark:!bg-cocos-500 dark:hover:!bg-cocos-600"
        onClick={() => track('Button | Operá en Cocos')}
      >
        Operá en Cocos
      </Link>
    </Button>
  )
}
