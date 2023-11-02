import { dolar } from '@/app/api/update-prices/route'
import { kv } from '@vercel/kv'

export const revalidate = 60

export default async function Home() {
  const dolar: dolar | null = await kv.get('dolar')

  return (
    <div className="flex w-full items-center justify-center gap-4">
      {/* Dólar Oficial */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar Oficial</h2>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Compra</h3>
            <p>{dolar?.oficial.bid}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Venta</h3>
            <p>{dolar?.oficial.ask}</p>
          </div>
        </div>
      </div>
      {/* Dólar tarjeta/turista/solidario/ahorro */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar Tarjeta/Turista/Solidario/Ahorro</h2>
        <div className="flex flex-col items-center justify-center gap-2">
          <p>{dolar?.solidario}</p>
        </div>
      </div>
      {/* Dólar Blue */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar Blue</h2>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Compra</h3>
            <p>{dolar?.blue.bid}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Venta</h3>
            <p>{dolar?.blue.bid}</p>
          </div>
        </div>
      </div>
      {/* Dólar MEP */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar MEP</h2>
        <div className="flex flex-col items-center justify-center gap-2">
          <p>{dolar?.mep}</p>
        </div>
      </div>
      {/* Dólar MEP 24/7 */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar MEP 24/7</h2>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Compra</h3>
            <p>{dolar?.cocos.bid}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Venta</h3>
            <p>{dolar?.cocos.ask}</p>
          </div>
        </div>
      </div>
      {/* Dólar CCL */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar CCL</h2>
        <div className="flex flex-col items-center justify-center gap-2">
          <p>{dolar?.ccl}</p>
        </div>
      </div>
      {/* Dólar Cripto */}
      <div className="flex w-fit min-w-[10rem] flex-col items-center justify-center rounded-2xl bg-black p-4 text-white">
        <h2>Dólar Cripto</h2>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Compra</h3>
            <p>{dolar?.cripto.bid}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Venta</h3>
            <p>{dolar?.cripto.ask}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
