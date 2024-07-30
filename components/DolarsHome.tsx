'use client'

import { LastPrices, PriceType } from '@/app/api/get-last-prices/types'
import DolarTypeGrid from '@/components/DolarTypeGrid'
import DolarTypeList from '@/components/DolarTypeList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetcher } from '@/utils/utils'
import { AlignJustify, Grid2X2, Rows } from 'lucide-react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

const LastUpdateTime = dynamic(() => import('@/components/LastUpdateTime'))

export interface DolarType {
  name?: string
  bid?: number
  ask?: number
  timestamp: Date
  today: PriceType[]
}

export default function DolarsHome({ lastPrices }: { lastPrices: LastPrices }) {
  const {
    data: prices,
    isLoading,
    error,
  }: {
    data: LastPrices
    isLoading: boolean
    error: any
  } = useSWR<any>('/api/get-last-prices', fetcher, {
    refreshInterval: 1000,
    fallbackData: lastPrices,
  })

  const dolars: DolarType[] = [
    {
      name: 'Oficial',
      bid: prices?.oficial?.bid,
      ask: prices?.oficial?.ask,
      timestamp: prices?.oficial?.timestamp,
      today: prices?.oficial?.today,
    },
    {
      name: 'Blue',
      bid: prices?.blue?.bid,
      ask: prices?.blue?.ask,
      timestamp: prices?.blue?.timestamp,
      today: prices?.blue?.today,
    },
    {
      name: 'MEP',
      bid: prices?.mep?.bid,
      ask: prices?.mep?.ask,
      timestamp: prices?.mep?.timestamp,
      today: prices?.mep?.today,
    },
    {
      name: 'Cocos',
      bid: prices?.cocos?.bid,
      ask: prices?.cocos?.ask,
      timestamp: prices?.cocos?.timestamp,
      today: prices?.cocos?.today,
    },
    {
      name: 'Tarjeta',
      ask: prices?.tarjeta?.ask,
      timestamp: prices?.tarjeta?.timestamp,
      today: prices?.tarjeta?.today,
    },
    {
      name: 'Mayorista',
      bid: prices?.mayorista?.bid,
      ask: prices?.mayorista?.ask,
      timestamp: prices?.mayorista?.timestamp,
      today: prices?.mayorista?.today,
    },
    {
      name: 'CCL',
      bid: prices?.ccl?.bid,
      ask: prices?.ccl?.ask,
      timestamp: prices?.ccl?.timestamp,
      today: prices?.ccl?.today,
    },
    {
      name: 'Cripto',
      bid: prices?.cripto?.bid,
      ask: prices?.cripto?.ask,
      timestamp: prices?.cripto?.timestamp,
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
