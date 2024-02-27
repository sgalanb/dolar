import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dólar Mayorista - Precio del dólar mayorista hoy | DólarYa',
  description:
    'Seguí la cotización del dólar mayorista hoy en Argentina y mirá los gráficos históricos.',
  twitter: {
    title: 'Dólar Mayorista - Precio del dólar mayorista hoy | DólarYa',
    description:
      'Seguí la cotización del dólar mayorista hoy en Argentina y mirá los gráficos históricos.',
    card: 'summary_large_image',
    site: '@dolarya_info',
  },
}

export default async function Mayorista() {
  // const lastPrices: LastPrices = await fetch(
  //   `${domain}/api/get-last-prices`
  // ).then((res) => res.json())
  // return <DolarTypePage type="Mayorista" lastPrices={lastPrices} />
  return <div></div>
}
