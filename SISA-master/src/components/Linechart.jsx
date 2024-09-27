import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LineElement,
  Title,
  LinearScale,
  PointElement,
  LineController,
} from 'chart.js';
import axios from 'axios';

// Registro de los componentes necesarios en Chart.js
ChartJS.register(LineElement, Tooltip, Legend, Title, LinearScale, PointElement, LineController);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Casos Reportados',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointRadius: 5,
        fill: true,
      },
    ],
  });

  const options = {
    maintainAspectRatio: false, // Permite que el gráfico se ajuste al tamaño del contenedor
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valores',
        },
        min: 0,
        max: 50,
      },
    },
  };

  // Efecto para obtener datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/casos'); // Asegúrate de que la URL es correcta
        const casos = response.data; // Suponiendo que aquí recibes los datos de los casos

        // Procesa los datos para agrupar por mes
        const monthlyData = {};
        casos.forEach(caso => {
          const createdAt = new Date(caso.createdAt); // Asegúrate de que createdAt está en el formato correcto
          const month = createdAt.getMonth(); // Obtén el mes como número (0-11)
          const year = createdAt.getFullYear(); // Obtén el año
          const key = `${month}-${year}`; // Crea una clave como "0-2024" para Enero 2024

          if (!monthlyData[key]) {
            monthlyData[key] = 0; // Inicializa si no existe
          }
          monthlyData[key]++; // Incrementa el conteo
        });

        // Convierte el objeto a arrays para el gráfico
        const sortedKeys = Object.keys(monthlyData).sort((a, b) => {
          const [monthA, yearA] = a.split('-').map(Number);
          const [monthB, yearB] = b.split('-').map(Number);
          return yearA - yearB || monthA - monthB; // Ordena primero por año y luego por mes
        });

        const labels = sortedKeys.map(key => {
          const [month, year] = key.split('-').map(Number);
          return new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' }); // "Enero 2024"
        });

        const data = sortedKeys.map(key => monthlyData[key]);

        setChartData({
          labels,
          datasets: [{
            label: 'Casos Reportados',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointRadius: 5,
            fill: true,
          }],
        });
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); // Solo se ejecuta al montar el componente

  return (
    <div className="outer-container">
      <p style={{ fontWeight: 'bold' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SAN RAFAEL</p>
      <div className="chart-container" style={{ height: '500px', width: '100%' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
