import React from 'react'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {externalTooltipHandler} from './externalTooltipHandler';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
const options = {
    scales: {
        x: {
            display: true,
            offset: true,
        },
        y: {
            display: true,
            beginAtZero: true,
            ticks: {
                stepSize: 1
            },
            grid: {
                display: true,
            },
        }

    },
    interaction: {
        intersect: false,
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            enabled: false,
            external: externalTooltipHandler
          }
    },
    responsive: true,
    stacked: false
};


export default function LineChart({ data, dateSelect }) {
    if (!data) {
        return null;
    } else {
        const labels = data["data"].map(item => {
            const date = new Date(item.key);
            let label = "";

            if (dateSelect === "24h") {
                label = `${date.getHours()}h`;
            } else if (dateSelect === "7d") {
                label = `${date.getDate()}/${date.getMonth() + 1}`;
            } else if (dateSelect === "30d") {
                label = `${date.getDate()}/${date.getMonth() + 1}`;
            }
            return label;
        });

        const totalValues = data["data"].map(item => item.total);
        const devicesValues = data["data"].map(item => item.devices);
        const dataReturn = {
            labels,
            datasets: [
                {
                    label: 'Total',
                    data: devicesValues,
                    tension: 0.2,
                    fill: true,
                    borderColor: 'rgba(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    pointRadius: 5,
                    pointBorderColor: 'rgba(255, 99, 132)',
                    pointBackgroundColor: 'rgba(255, 99, 132)',
                },
            ],
        }

        return (
            <Line data={dataReturn} options={options} />
        )
    }
}

