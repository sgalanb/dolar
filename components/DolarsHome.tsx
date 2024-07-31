'use client'

import DolarTypeGrid from '@/components/DolarTypeGrid'
import DolarTypeList from '@/components/DolarTypeList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/utils/supabase/client'
import dayjs from 'dayjs'
import { AlignJustify, Grid2X2, Rows } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const LastUpdateTime = dynamic(() => import('@/components/LastUpdateTime'))

export interface DolarType {
  name: string
  bid?: number | null
  ask?: number | null
  timestamp?: Date | null
  today?: number[]
}

export default function DolarsHome() {
  const supabase = createClient()

  async function getLastPrice(type: string) {
    const query = await supabase
      .from('historical-prices')
      .select('ask, bid, timestamp')
      .eq('type', type)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()
    return query.data
  }

  const [prices, setPrices] = useState<any>()

  async function getToday(type: string) {
    const { data: basePrice } = await supabase
      .from('historical-prices')
      .select('ask')
      .eq('type', type)
      .lte('timestamp', dayjs().startOf('day').toISOString())
      .order('timestamp', { ascending: true })
      .limit(1)
      .single()

    const { data: lastPrices } = await supabase
      .from('historical-prices')
      .select('ask')
      .eq('type', type)
      .gte('timestamp', dayjs().startOf('day').toISOString())
      .lte('timestamp', dayjs().toISOString())
      .order('timestamp', { ascending: true })

    const lastPricesNumbers = lastPrices?.map((price) => price.ask as number)

    if (basePrice?.ask && lastPricesNumbers) {
      return [basePrice.ask, ...lastPricesNumbers]
    } else if (lastPricesNumbers && !basePrice?.ask) {
      return lastPricesNumbers
    } else {
      return []
    }
  }

  async function fetchDolarTypes() {
    const lastOficial = await getLastPrice('oficial')
    console.log(lastOficial)
    const lastBlue = await getLastPrice('blue')
    const lastMep = await getLastPrice('mep')
    const lastCocos = await getLastPrice('cocos')
    const lastTarjeta = await getLastPrice('tarjeta')
    const lastMayorista = await getLastPrice('mayorista')
    const lastCcl = await getLastPrice('ccl')
    const lastCripto = await getLastPrice('cripto')

    const oficialToday = await getToday('oficial')
    const blueToday = await getToday('blue')
    const mepToday = await getToday('mep')
    const cocosToday = await getToday('cocos')
    const tarjetaToday = await getToday('tarjeta')
    const mayoristaToday = await getToday('mayorista')
    const cclToday = await getToday('ccl')
    const criptoToday = await getToday('cripto')

    setPrices({
      oficial: {
        ...lastOficial,
        today: oficialToday,
      },
      blue: {
        ...lastBlue,
        today: blueToday,
      },
      mep: {
        ...lastMep,
        today: mepToday,
      },
      cocos: {
        ...lastCocos,
        today: cocosToday,
      },
      tarjeta: {
        ...lastTarjeta,
        today: tarjetaToday,
      },
      mayorista: {
        ...lastMayorista,
        today: mayoristaToday,
      },
      ccl: {
        ...lastCcl,
        today: cclToday,
      },
      cripto: {
        ...lastCripto,
        today: criptoToday,
      },
    })
  }

  // Fetch prices every 30 seconds
  useEffect(() => {
    fetchDolarTypes()
    const interval = setInterval(() => {
      fetchDolarTypes()
    }, 30000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dolars: DolarType[] = [
    {
      name: 'Oficial',
      bid: prices?.oficial?.bid,
      ask: prices?.oficial?.ask,
      timestamp: prices?.oficial?.timestamp
        ? new Date(prices.oficial.timestamp)
        : null,
      today: prices?.oficial?.today,
    },
    {
      name: 'Blue',
      bid: prices?.blue?.bid,
      ask: prices?.blue?.ask,
      timestamp: prices?.blue?.timestamp
        ? new Date(prices.blue.timestamp)
        : null,
      today: prices?.blue?.today,
    },
    {
      name: 'MEP',
      bid: prices?.mep?.bid,
      ask: prices?.mep?.ask,
      timestamp: prices?.mep?.timestamp ? new Date(prices.mep.timestamp) : null,
      today: prices?.mep?.today,
    },
    {
      name: 'Cocos',
      bid: prices?.cocos?.bid,
      ask: prices?.cocos?.ask,
      timestamp: prices?.cocos?.timestamp
        ? new Date(prices.cocos.timestamp)
        : null,
      today: prices?.cocos?.today,
    },
    {
      name: 'Tarjeta',
      ask: prices?.tarjeta?.ask,
      timestamp: prices?.tarjeta?.timestamp
        ? new Date(prices.tarjeta.timestamp)
        : null,
      today: prices?.tarjeta?.today,
    },
    {
      name: 'Mayorista',
      bid: prices?.mayorista?.bid,
      ask: prices?.mayorista?.ask,
      timestamp: prices?.mayorista?.timestamp
        ? new Date(prices.mayorista.timestamp)
        : null,
      today: prices?.mayorista?.today,
    },
    {
      name: 'CCL',
      bid: prices?.ccl?.bid,
      ask: prices?.ccl?.ask,
      timestamp: prices?.ccl?.timestamp ? new Date(prices.ccl.timestamp) : null,
      today: prices?.ccl?.today,
    },
    {
      name: 'Cripto',
      bid: prices?.cripto?.bid,
      ask: prices?.cripto?.ask,
      timestamp: prices?.cripto?.timestamp
        ? new Date(prices.cripto.timestamp)
        : null,
      today: prices?.cripto?.today,
    },
  ]

  return (
    <Tabs defaultValue="grid" className="flex w-full flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          Cotización del dólar hoy
        </h1>
        <div className="flex h-full">
          <TabsList className="grid w-fit grid-cols-2 self-end">
            <TabsTrigger value="grid">
              <Grid2X2 className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list">
              <Rows className="h-4 w-4 md:hidden" />
              <AlignJustify className="hidden h-4 w-4 md:flex" />
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      <TabsContent value="grid" className="w-full self-center">
        <div className="grid w-full grid-cols-1 items-center justify-center gap-3 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {dolars.map((dolarType, index) => (
            <DolarTypeGrid dolarType={dolarType} key={index} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="list">
        <div className="grid w-full grid-cols-1 flex-col items-center justify-center gap-3 md:grid-cols-2">
          {dolars.map((dolarType, index) => (
            <DolarTypeList dolarType={dolarType} key={index} />
          ))}
        </div>
      </TabsContent>
      <LastUpdateTime />
    </Tabs>
  )
}
