'use client'

import DolarTypeGrid from '@/components/DolarTypeGrid'
import DolarTypeList from '@/components/DolarTypeList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getLastPricesSnapshot } from '@/lib/firebaseSDK'
import { DocumentData } from 'firebase/firestore'
import { AlignJustify, Grid2X2, Rows } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface DolarType {
  name: string
  bid?: string
  ask: string
  timestamp: number
}

export default function DolarsHome({
  lastPrices,
}: {
  lastPrices: DocumentData | undefined
}) {
  const [prices, setPrices] = useState(lastPrices)

  useEffect(() => {
    let unsubscribe: () => void

      // Immediately invoked async function to handle the promise
    ;(async () => {
      unsubscribe = await getLastPricesSnapshot((newPrices) => {
        setPrices(newPrices) // Update the prices state whenever there's a change
      })
    })()

    // Unsubscribe from the snapshot listener when the component unmounts
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const dolars: DolarType[] = [
    {
      name: 'Oficial',
      bid: `${prices?.oficial.bid.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${prices?.oficial.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      timestamp: prices?.oficial.timestamp,
    },
    {
      name: 'Blue',
      bid: `${prices?.blue.bid.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${prices?.blue.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      timestamp: prices?.blue.timestamp,
    },
    {
      name: 'MEP',
      bid: `${prices?.mep.bid.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${prices?.mep.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      timestamp: prices?.mep.timestamp,
    },
    {
      name: 'Cocos',
      bid: `${prices?.cocos.bid.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${prices?.cocos.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      timestamp: prices?.cocos.timestamp,
    },
    {
      name: 'Tarjeta',
      ask: `${prices?.tarjeta.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      timestamp: prices?.tarjeta.timestamp,
    },
    {
      name: 'Mayorista',
      bid: `${prices?.mayorista.bid.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${prices?.mayorista.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      timestamp: prices?.mayorista.timestamp,
    },
    {
      name: 'CCL',
      bid: `${prices?.ccl.bid.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${prices?.ccl.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      timestamp: prices?.ccl.timestamp,
    },
    {
      name: 'Cripto',
      bid: `${prices?.cripto.bid.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      ask: `${prices?.cripto.ask.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      timestamp: prices?.cripto.timestamp,
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
          {dolars.map((dolarType: DolarType, index: number) => (
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
    </Tabs>
  )
}
