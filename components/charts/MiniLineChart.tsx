import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  layout: {
    padding: 2,
  },
}

export default function MiniLineChart({ lineData }: any) {
  return <Line data={lineData} options={chartOptions} height={0} width={0} />
}
