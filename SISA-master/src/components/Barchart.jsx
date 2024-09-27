import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  Title,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import axios from 'axios';

// Registrar las escalas y componentes necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const Barchart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Casos Reportados',
        data: [],
        backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
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
  };

  // Nombres de los meses
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Efecto para obtener datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/casos'); // Cambia la URL si es necesario
        const casos = response.data; // Suponiendo que aquí recibes los datos de los casos

        // Agrupar los casos por mes
        const monthlyCounts = {};

        casos.forEach(caso => {
          const date = new Date(caso.createdAt);
          const month = date.getMonth(); // Obtener el índice del mes (0-11)
          const year = date.getFullYear();
          const label = `${month}-${year}`; // Usar 'mes-año' para el orden

          if (!monthlyCounts[label]) {
            monthlyCounts[label] = 0;
          }
          monthlyCounts[label]++;
        });

        // Convertir el objeto en arrays para Chart.js
        const labels = Object.keys(monthlyCounts).sort((a, b) => {
          const [monthA, yearA] = a.split('-').map(Number);
          const [monthB, yearB] = b.split('-').map(Number);
          return yearA === yearB ? monthA - monthB : yearA - yearB; // Ordenar primero por año y luego por mes
        });

        // Formatear las etiquetas para mostrar el nombre del mes
        const formattedLabels = labels.map(label => {
          const [monthIndex, year] = label.split('-').map(Number);
          return `${monthNames[monthIndex]} ${year}`; // Obtener el nombre del mes usando el índice
        });

        const data = labels.map(label => monthlyCounts[label]); // Obtener los datos correspondientes a las etiquetas ordenadas

        setChartData({
          labels: formattedLabels, // Usar las etiquetas formateadas
          datasets: [
            {
              label: 'Casos Reportados',
              data,
              backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); // Solo se ejecuta al montar el componente

  return (
    <div className="outer-container">
      <p style={{ fontWeight: 'bold' }}>&nbsp;&nbsp;&nbsp;&nbsp;SAN RAFAEL</p>
      <div className="chart-container" style={{ height: '500px', width: '100%' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Barchart;
