'use client'

import { DolarType } from '@/components/DolarsHome'
import MiniLineChart from '@/components/charts/MiniLineChart'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function DolarTypeGrid({ dolarType }: { dolarType: DolarType }) {
  const { resolvedTheme } = useTheme()

  const todayPrices = dolarType.today ?? []

  const chartPrices = dolarType.ask
    ? [...todayPrices, dolarType.ask]
    : todayPrices

  const porcentualChange =
    ((chartPrices[chartPrices.length - 1] - chartPrices[0]) / chartPrices[0]) *
    100

  const lineData = {
    labels: new Array(
      dolarType.ask == todayPrices[todayPrices.length - 1]
        ? todayPrices.length == 1
          ? 2
          : todayPrices.length
        : chartPrices.length
    ).fill(''),
    datasets: [
      {
        label: 'Prices',
        data:
          dolarType.ask == todayPrices[todayPrices.length - 1]
            ? todayPrices.length == 1
              ? [todayPrices[0], todayPrices[0]]
              : todayPrices
            : chartPrices,
        borderColor:
          dolarType.name == 'Cocos' && resolvedTheme == 'light'
            ? '#0062E1'
            : dolarType.name == 'Cocos' && resolvedTheme == 'dark'
              ? '#3b8df1'
              : chartPrices[0] <= chartPrices[chartPrices.length - 1]
                ? '#49ca4b'
                : '#D83141',
        borderWidth: 3,
        tension: 0.1,
        pointRadius: 0, // No points
        //pointBorderColor: 'white',
        borderCapStyle: 'round',
      },
    ],
  }

  return (
    <Link
      href={`/${dolarType?.name?.toLowerCase()}`}
      className={`${
        dolarType.name == 'Cocos'
          ? 'border-2 border-cocos-600 dark:border-cocos-500'
          : ''
      } grid aspect-square h-full w-full grid-cols-1 grid-rows-[28px,1fr,52px] flex-col items-center justify-between gap-3 rounded-2xl bg-white p-3 shadow hover:opacity-80 dark:bg-zinc-800 dark:shadow-none`}
    >
      <div className="flex h-full w-full items-center justify-between">
        <h2
          className={`${
            dolarType.name == 'Cocos'
              ? 'text-cocos-600 dark:text-cocos-500'
              : ''
          } flex h-full w-fit items-center justify-start text-xl font-semibold leading-5 tracking-tight`}
        >
          {dolarType.name}
        </h2>
        <span
          className={`${
            dolarType.name == 'Cocos' && resolvedTheme == 'light'
              ? 'bg-cocos-600/20 text-cocos-600'
              : dolarType.name == 'Cocos' && resolvedTheme == 'dark'
                ? 'bg-cocos-500/20 text-cocos-500'
                : dolarType.name == 'Cocos'
                  ? 'bg-cocos-600/20 text-cocos-600'
                  : chartPrices[0] <= chartPrices[chartPrices.length - 1]
                    ? 'bg-[#49ca4b]/20 text-[#49ca4b]'
                    : 'bg-[#D83141]/20 text-[#D83141]'
          } w-fit rounded p-1 px-2 text-sm font-normal`}
        >
          {porcentualChange >= 0
            ? `+${porcentualChange
                .toFixed(dolarType.name == 'Mayorista' ? 0 : 2)
                .replace('.', ',')} %`
            : `-${Math.abs(porcentualChange)
                .toFixed(dolarType.name == 'Mayorista' ? 0 : 2)
                .replace('.', ',')} %`}
        </span>
      </div>
      <div className="h-full w-full">
        <MiniLineChart lineData={lineData} />
      </div>
      {dolarType.bid ? (
        <div className="flex h-[3.25rem] w-full flex-col items-center justify-center gap-3">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-normal ">Comprá</span>
            <p className="text-xl font-semibold leading-5">
              {dolarType?.ask?.toFixed(2)?.replace('.', ',')}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-normal text-black/50 dark:text-white/50">
              Vendé
            </span>
            <p className="text-xl font-semibold leading-5 text-black/50 dark:text-white/50">
              {dolarType?.bid?.toFixed(2)?.replace('.', ',')}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-normal">Comprá</span>
            <p className="text-xl font-semibold leading-5">
              {dolarType?.ask?.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      )}
    </Link>
  )
}
