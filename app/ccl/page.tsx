import DolarTypePage from '@/components/DolarTypePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar CCL | DólarYa',
  description:
    'Seguí la cotización del dólar contado con liquidación hoy en Argentina. Mirá la cotización histórica.',
}

export default function CCL() {
  return (
    <div className="flex w-full items-center justify-center">
      <DolarTypePage type="CCL" />
    </div>
  )
}
