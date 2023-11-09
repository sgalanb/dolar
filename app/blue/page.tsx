import DolarTypePage from '@/components/DolarTypePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Blue | DólarYa',
  description:
    'Seguí la cotización del dólar blue hoy en Argentina. Mirá la cotización histórica.',
}

export default function Blue() {
  return (
    <div className="flex w-full items-center justify-center">
      <DolarTypePage type="Blue" />
    </div>
  )
}
