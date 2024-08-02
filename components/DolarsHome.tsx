'use client'

import { Prices } from '@/app/page'
import DolarTypeGrid from '@/components/DolarTypeGrid'
import DolarTypeList from '@/components/DolarTypeList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlignJustify, Grid2X2, Rows } from 'lucide-react'
import dynamic from 'next/dynamic'

const LastUpdateTime = dynamic(() => import('@/components/LastUpdateTime'))

export interface DolarType {
  name: string
  bid?: number | null
  ask?: number | null
  timestamp?: Date | null
  today?: number[]
}

export default function DolarsHome({ prices }: { prices: Prices }) {
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
