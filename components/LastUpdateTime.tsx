'use client'

import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { useEffect, useState } from 'react'

dayjs.extend(LocalizedFormat)

export default function LastUpdateTime() {
  const [localTime, setLocalTime] = useState(dayjs().format('LT'))

  useEffect(() => {
    // Function to update the local time
    const updateLocalTime = () => {
      setLocalTime(dayjs().format('LT'))
    }

    // Set an interval to update the local time every second
    const interval = setInterval(updateLocalTime, 1000)

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="w-full text-center text-sm font-normal tracking-tight text-zinc-500 dark:text-zinc-400">
      Última actualización: {localTime}
    </span>
  )
}
