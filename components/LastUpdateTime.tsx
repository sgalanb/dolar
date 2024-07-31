'use client'

import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { useEffect, useState } from 'react'

dayjs.extend(LocalizedFormat)

export default function LastUpdateTime() {
  const [localTime, setLocalTime] = useState(dayjs().format('DD/MM/YYYY HH:mm'))

  useEffect(() => {
    // Function to update the local time
    const updateLocalTime = () => {
      setLocalTime(dayjs().format('DD/MM/YYYY HH:mm'))
    }

    // Set an interval to update the local time every second
    const interval = setInterval(updateLocalTime, 1000)

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="w-full text-center text-sm font-normal tracking-tight text-black/50 dark:text-white/50">
      Última actualización: {localTime}
    </span>
  )
}
