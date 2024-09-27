import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  Title,
} from 'chart.js';
import axios from 'axios';

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Casos 2024',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  // Efecto para obtener datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/casos');
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

        setChartData(prevData => ({
          ...prevData,
          labels,
          datasets: [{
            ...prevData.datasets[0],
            data,
          }],
        }));
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); // Solo se ejecuta al montar el componente

  return (
    <div className="outer-container">
      <p style={{ fontWeight: 'bold'}}>&nbsp;&nbsp;&nbsp;SAN RAFAEL</p>
      <div className="chart-container" style={{ height: '500px', width: '100%' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
