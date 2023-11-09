import DolarTypePage from '@/components/DolarTypePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar MEP | DólarYa',
  description:
    'Seguí la cotización del dólar MEP hoy en Argentina. Mirá la cotización histórica.',
}

export default function MEP() {
  return (
    <div className="flex w-full items-center justify-center">
      <DolarTypePage type="MEP" />
    </div>
  )
}
