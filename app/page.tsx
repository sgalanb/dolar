import { dolar } from '@/app/api/update-prices/route'
import { kv } from '@vercel/kv'

export default async function Home() {
  const dolar: dolar | null = await kv.get('dolar')

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {/* Dólar Oficial */}
      <div className="flex w-full items-center justify-between rounded-2xl border border-zinc-100 bg-white p-4 shadow">
        <h2 className="font-bold">Oficial</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-1">
            <h3>Vendé a</h3>
            <p className="font-bold">{`${dolar?.oficial.bid.toFixed(2)}`}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <h3>Comprá a</h3>
            <p className="font-bold">{`${dolar?.oficial.ask.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
      {/* Dólar tarjeta/turista/solidario/ahorro */}
      <div className="flex w-full items-center justify-between rounded-2xl border border-zinc-100 bg-white p-4 shadow">
        <h2 className="font-bold">Solidario</h2>
        <div className="flex flex-col items-center justify-center gap-1">
          <h3>Compra/Venta</h3>
          <p className="font-bold">{`${dolar?.solidario.toFixed(2)}`}</p>
        </div>
      </div>
      {/* Dólar Blue */}
      <div className="flex w-full items-center justify-between rounded-2xl border border-zinc-100 bg-white p-4 shadow">
        <h2 className="font-bold">Blue</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-1">
            <h3>Vendé a</h3>
            <p className="font-bold">{`${dolar?.blue.bid.toFixed(2)}`}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <h3>Comprá a</h3>
            <p className="font-bold">{`${dolar?.blue.ask.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
      {/* Dólar MEP */}
      <div className="flex w-full items-center justify-between rounded-2xl border border-zinc-100 bg-white p-4 shadow">
        <h2 className="font-bold">MEP</h2>
        <div className="flex flex-col items-center justify-center gap-1">
          <h3>Compra/Venta</h3>
          <p className="font-bold">{`${dolar?.mep.toFixed(2)}`}</p>
        </div>
      </div>
      {/* Dólar MEP 24/7 */}
      <div className="flex w-full items-center justify-between rounded-2xl border border-zinc-100 bg-white p-4 shadow">
        <h2 className="font-bold">MEP 24/7</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-1">
            <h3>Vendé a</h3>
            <p className="font-bold">{`${dolar?.cocos.bid.toFixed(2)}`}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <h3>Comprá a</h3>
            <p className="font-bold">{`${dolar?.cocos.ask.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
      {/* Dólar CCL */}
      <div className="flex w-full items-center justify-between rounded-2xl border border-zinc-100 bg-white p-4 shadow">
        <h2 className="font-bold">CCL</h2>
        <div className="flex flex-col items-center justify-center gap-2">
          <h3>Compra/Venta</h3>
          <p className="font-bold">{`${dolar?.ccl.toFixed(2)}`}</p>
        </div>
      </div>
      {/* Dólar Cripto */}
      <div className="flex w-full items-center justify-between rounded-2xl border border-zinc-100 bg-white p-4 shadow">
        <h2 className="font-bold">Cripto</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Vendé a</h3>
            <p className="font-bold">{`${dolar?.cripto.bid.toFixed(2)}`}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h3>Comprá a</h3>
            <p className="font-bold">{`${dolar?.cripto.ask.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
