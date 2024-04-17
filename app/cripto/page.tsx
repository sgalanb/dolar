import { LastPrices } from '@/app/api/get-last-prices/types'
import DolarTypePage from '@/components/DolarTypePage'
import { Separator } from '@/components/ui/separator'
import { getDiff } from '@/lib/utils'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())

  const criptoBid = `$${lastPrices?.cripto?.bid?.toFixed(2)?.replace('.', ',')}`
  const criptoAsk = `$${lastPrices?.cripto?.ask?.toFixed(2)?.replace('.', ',')}`
  const criptoDiffNumber = getDiff(lastPrices?.cripto)
  const criptoDiff = criptoDiffNumber.toFixed(2)?.replace('.', ',')
  const fecha = dayjs().subtract(3, 'hour').format('DD/MM - HH:mm')

  const ogImageURL =
    `https://sharepreviews.com/og/96aa1fff-29b4-41cc-9ea0-35fc1b378973?` +
    `${
      criptoDiffNumber >= 0
        ? 'positive_diff_isVisible=true'
        : 'negative_diff_isVisible=true'
    }` +
    `&${
      criptoDiffNumber >= 0
        ? `positive_diff_value=%2b%20${criptoDiff}%25`
        : `negative_diff_value=%20${criptoDiff}%25`
    }` +
    `&ask_price_value=${criptoAsk}&bid_price_value=${criptoBid}&fecha_value=${fecha}&dolar_type_value=Dólar%20Cripto`

  return {
    title: 'Dólar Cripto - Precio del dólar cripto hoy | DólarYa',
    description:
      'Seguí la cotización del dólar crypto hoy en Argentina y mirá los gráficos históricos.',
    openGraph: {
      title: 'Dólar Cripto - Precio del dólar cripto hoy | DólarYa',
      description:
        'Seguí la cotización del dólar crypto hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      type: 'website',
    },
    twitter: {
      title: 'Dólar Cripto - Precio del dólar cripto hoy | DólarYa',
      description:
        'Seguí la cotización del dólar crypto hoy en Argentina y mirá los gráficos históricos.',
      images: [ogImageURL],
      card: 'summary_large_image',
      site: '@dolarya_info',
      creator: '@sgalanb',
    },
  }
}

export default async function Cripto() {
  const lastPrices: LastPrices = await fetch(
    `https://dolarya.info/api/get-last-prices`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json())

  return (
    <div className="flex flex-col items-center justify-center gap-9">
      <DolarTypePage type="Cripto" lastPrices={lastPrices} />
      <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-[3fr,1px,1fr]">
        <div className="flex flex-col gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">
            ¿Qué es el dólar Cripto?
          </h2>
          <p>
            El dólar Cripto se refiere a un tipo de criptomoneda que está
            vinculada o anclada al valor del dólar estadounidense. Estas monedas
            digitales, conocidas como stablecoins o monedas estables, buscan
            ofrecer la estabilidad del dólar mientras mantienen las ventajas de
            las criptomonedas, como la descentralización y la fácil
            transferencia.
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-start justify-start gap-3 rounded-2xl">
          <h2 className="text-xl font-semibold leading-5">Fuente de precios</h2>
          <Link
            href="https://criptoya.com/"
            className="flex items-center justify-center gap-1 hover:underline"
            target="_blank"
          >
            - CriptoYa (promedio de los principales exchanges)
          </Link>
        </div>
      </div>
    </div>
  )
}
