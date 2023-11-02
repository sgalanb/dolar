import { calculateAverageCryptoDolarPrices } from '@/lib/utils'

export const revalidate = 60

async function getDolarBNA() {
  const res = await fetch('https://criptoya.com/api/bna')

  // test this in prod
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getDolarCocos() {
  const res = await fetch('https://api.cocos.capital/api/v1/public/dolar-mep')

  // test this in prod
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getDolarCrypto() {
  const res = await fetch('https://criptoya.com/api/usdc/ars/0.1')

  // test this in prod
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = res.json()

  return calculateAverageCryptoDolarPrices(await data)
}

async function getOtherDolars() {
  const res = await fetch('https://criptoya.com/api/dolar')

  // test this in prod
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function endpointsTestUsage() {
  const res = await fetch('https://www.pretzeldiary.com/api/counter-endpoint')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return
}

export default async function Home() {
  const dolarBNA = await getDolarBNA()
  const otherDolars = await getOtherDolars()
  const dolarCocos = await getDolarCocos()
  const dolarCrypto = await getDolarCrypto()
  const test = await endpointsTestUsage()

  return (
    <div className="flex w-full items-center justify-center gap-4">
      {/* Dólar Oficial */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar Oficial</h2>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Compra</h3>
            <p>{dolarBNA.bid}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Venta</h3>
            <p>{dolarBNA.ask}</p>
          </div>
        </div>
      </div>
      {/* Dólar tarjeta/turista/solidario/ahorro */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar Tarjeta/Turista/Solidario/Ahorro</h2>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Compra</h3>
            <p>{otherDolars.solidario}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Venta</h3>
            <p>{otherDolars.solidario}</p>
          </div>
        </div>
      </div>
      {/* Dólar Blue */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar Blue</h2>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Compra</h3>
            <p>{otherDolars.blue_bid}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Venta</h3>
            <p>{otherDolars.blue}</p>
          </div>
        </div>
      </div>
      {/* Dólar MEP */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar MEP</h2>
        <div className="flex flex-col items-center justify-center gap-2">
          <h3>Compra</h3>
          <p>{otherDolars.mep}</p>
        </div>
      </div>
      {/* Dólar MEP 24/7 */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar MEP 24/7</h2>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Compra</h3>
            <p>{dolarCocos.bid}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Venta</h3>
            <p>{dolarCocos.ask}</p>
          </div>
        </div>
      </div>
      {/* Dólar Cripto */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar Cripto</h2>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Compra</h3>
            <p>{dolarCrypto.bid}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Venta</h3>
            <p>{dolarCrypto.ask}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
