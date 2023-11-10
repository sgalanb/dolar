import DolarTypePage from '@/components/DolarTypePage'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dólar Cocos | DólarYa',
  description:
    'Seguí la cotización del dólar MEP 24/7 de Cocos hoy en Argentina. Mirá la cotización histórica.',
}

export default function Cocos() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-9">
      <DolarTypePage type="Cocos" />
      <Button asChild>
        <Link
          href="https://app.cocos.capital?ref=dolarya.info"
          target="_blank"
          className="!bg-cocos-600 hover:!bg-cocos-500 dark:!bg-cocos-500 dark:hover:!bg-cocos-600"
        >
          Operá en Cocos
        </Link>
      </Button>
    </div>
  )
}
