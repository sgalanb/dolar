import { createClient } from '@/utils/supabase/service-role'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

// This endpoint runs every minute with a Vercel cron job
export async function GET(request: NextRequest) {
  // Only allow Vercel to access this endpoint
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(`Not authorized.`, {
      status: 500,
    })
  }

  try {
    const supabase = createClient()

    async function deleteLastPrices(type: string) {
      const query = await supabase
        .from('last-prices')
        .delete()
        .eq('type', type)
        .select()
      return query.data
    }

    const lastOficialArray = await deleteLastPrices('oficial')
    const lastOficial = lastOficialArray?.reduce((prev, current) =>
      prev.timestamp > current.timestamp ? prev : current
    )
    const lastBlueArray = await deleteLastPrices('blue')
    const lastBlue = lastBlueArray?.reduce((prev, current) =>
      prev.timestamp > current.timestamp ? prev : current
    )
    const lastMepArray = await deleteLastPrices('mep')
    const lastMep = lastMepArray?.reduce((prev, current) =>
      prev.timestamp > current.timestamp ? prev : current
    )
    const lastCocosArray = await deleteLastPrices('cocos')
    const lastCocos = lastCocosArray?.reduce((prev, current) =>
      prev.timestamp > current.timestamp ? prev : current
    )
    const lastTarjetaArray = await deleteLastPrices('tarjeta')
    const lastTarjeta = lastTarjetaArray?.reduce((prev, current) =>
      prev.timestamp > current.timestamp ? prev : current
    )
    const lastMayoristaArray = await deleteLastPrices('mayorista')
    const lastMayorista = lastMayoristaArray?.reduce((prev, current) =>
      prev.timestamp > current.timestamp ? prev : current
    )
    const lastCclArray = await deleteLastPrices('ccl')
    const lastCcl = lastCclArray?.reduce((prev, current) =>
      prev.timestamp > current.timestamp ? prev : current
    )
    const lastCriptoArray = await deleteLastPrices('cripto')
    const lastCripto = lastCriptoArray?.reduce((prev, current) =>
      prev.timestamp > current.timestamp ? prev : current
    )

    const insertLastPrice = async (
      type: string,
      ask: number | null | undefined,
      bid: number | null | undefined
    ) => {
      await supabase.from('last-prices').insert({ type, ask, bid })
    }

    Promise.all([
      insertLastPrice('oficial', lastOficial?.ask, lastOficial?.bid),
      insertLastPrice('blue', lastBlue?.ask, lastBlue?.bid),
      insertLastPrice('mep', lastMep?.ask, lastMep?.bid),
      insertLastPrice('cocos', lastCocos?.ask, lastCocos?.bid),
      insertLastPrice('tarjeta', lastTarjeta?.ask, lastTarjeta?.bid),
      insertLastPrice('mayorista', lastMayorista?.ask, lastMayorista?.bid),
      insertLastPrice('ccl', lastCcl?.ask, lastCcl?.bid),
      insertLastPrice('cripto', lastCripto?.ask, lastCripto?.bid),
    ])

    return new Response('Updated prices.', {
      status: 200,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 500,
      })
    } else {
      return new Response(`Unknown error occurred: ${error}`, {
        status: 500,
      })
    }
  }
}
