import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

export default function LineChart({ lineData }: any) {
  return (
    <Line
      data={lineData}
      options={{
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: 'rgba(51, 65, 85, 0.3)',
            },
            ticks: {
              minRotation: 45,
              color: 'rgb(148, 163, 184)',
            },
          },
          y: {
            grid: {
              color: 'rgba(51, 65, 85, 0.3)',
            },
            ticks: {
              color: 'rgb(148, 163, 184)',
            },
          },
        },
      }}
    />
  )
}
