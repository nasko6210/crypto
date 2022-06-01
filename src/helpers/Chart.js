import { React, useState, useEffect } from "react";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker"
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import  Axios  from "axios";


export function BarChart() {
  const [cryptoData, setCryptoData] = useState([]);
  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=100").then((response) => {
      setCryptoData(response.data.coins)
      
    })
  },[])

  Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'dsa',
      },
    },
  };
  const labels = ["January", "February", "March"];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,3],
        backgroundColor: 'rgba(53,162,235,0.5)',
      },
      {
        label: 'Dataset 2',
        data: [1,2,3],
        backgroundColor: 'rgba(255,99,132,0.5)'
      }
    ]
  };

  return (
    <Bar data={data} options={options} />
  )
}

