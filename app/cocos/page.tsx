import DolarTypePage from '@/components/DolarTypePage'
import OperaEnCocosButton from '@/components/OperaEnCocosButton'
import { Separator } from '@/components/ui/separator'
import { LastPricesInterface, getLastPrices } from '@/lib/firebaseSDK'
import { Metadata } from 'next'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

export const metadata: Metadata = {
  title: 'Dólar Cocos - Precio del dólar Cocos hoy | DólarYa',
  description:
    'Seguí la cotización del dólar Cocos 24/7 hoy en Argentina y mirá los gráficos históricos.',
}

export default async function Cocos() {
  const lastPrices: LastPricesInterface = await getLastPrices()

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarTypePage type="Cocos" lastPrices={lastPrices.cocos} />
      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl border-[4px] border-cocos-600 bg-white p-6 dark:bg-zinc-100 md:flex-row md:p-9">
        <h2 className="text-center text-2xl font-bold text-cocos-900 md:w-2/3 md:text-left">
          <Balancer>
            Comprá dólares cualquier día y a cualquier hora en Cocos Capital
          </Balancer>
        </h2>
        <span className="flex items-center justify-center md:w-1/3">
          <OperaEnCocosButton variant="button" />
        </span>
      </div>
      <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-[3fr,1px,1fr]">
        <div className="flex flex-col gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">
            ¿Qué es el Dólar Cocos?
          </h2>
          <p>
            El dólar Cocos representa el precio del{' '}
            <Link href="/mep" className="underline underline-offset-2">
              dólar MEP
            </Link>{' '}
            en la aplicación de Cocos Capital. A diferencia de otras
            plataformas, en Cocos podés operar dólar MEP todos los días de la
            semana, las 24 horas del día. Es 100% legal y la actividad está
            regulada por la CNV.
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-start justify-start gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">Fuente de precios</h2>
          <OperaEnCocosButton variant="link" />
        </div>
      </div>
    </div>
  )
}
