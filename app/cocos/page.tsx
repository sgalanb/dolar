import { LastPrices } from '@/app/api/get-last-prices/types'
import DolarTypePage from '@/components/DolarTypePage'
import OperaEnCocosButton from '@/components/OperaEnCocosButton'
import { Separator } from '@/components/ui/separator'
import { getDiff } from '@/lib/utils'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

export async function generateMetadata(): Promise<Metadata> {
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())

  const cocosBid = `$${lastPrices?.cocos?.bid?.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
  const cocosAsk = `$${lastPrices?.cocos?.ask?.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
  const cocosDiffNumber = getDiff(lastPrices?.cocos)
  const cocosDiff = cocosDiffNumber.toFixed(2)?.replace('.', ',')
  const fecha = dayjs().subtract(3, 'hour').format('DD/MM - HH:mm')

  const ogImageURL =
    `https://sharepreviews.com/og/96aa1fff-29b4-41cc-9ea0-35fc1b378973?` +
    `${
      cocosDiffNumber >= 0
        ? 'positive_diff_isVisible=true'
        : 'negative_diff_isVisible=true'
    }` +
    `&${
      cocosDiffNumber >= 0
        ? `positive_diff_value=%2b%20${cocosDiff}%25`
        : `negative_diff_value=%20${cocosDiff}%25`
    }` +
    `&ask_price_value=${cocosAsk}&bid_price_value=${cocosBid}&fecha_value=${fecha}&dolar_type_value=Dólar%20Cocos`

  return {
    title: 'Dólar Cocos - Precio del dólar Cocos hoy | DólarYa',
    description:
      'Seguí la cotización del dólar Cocos 24/7 hoy en Argentina y mirá los gráficos históricos.',
    openGraph: {
      title: 'Dólar Cocos - Precio del dólar Cocos hoy | DólarYa',
      description:
        'Seguí la cotización del dólar Cocos 24/7 hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      type: 'website',
    },
    twitter: {
      title: 'Dólar Cocos - Precio del dólar Cocos hoy | DólarYa',
      description:
        'Seguí la cotización del dólar Cocos 24/7 hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      card: 'summary_large_image',
      site: '@dolarya_info',
      creator: '@sgalanb',
    },
  }
}

export default async function Cocos() {
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarTypePage type="Cocos" lastPrices={lastPrices} />
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
