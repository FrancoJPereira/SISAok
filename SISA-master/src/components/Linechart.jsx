import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, LineElement, Title, LinearScale, PointElement, LineController } from 'chart.js';

// Registro de los componentes necesarios en Chart.js
ChartJS.register(LineElement, Tooltip, Legend, Title, LinearScale, PointElement, LineController);

const LineChart = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [
      {
        label: 'Datos Ejemplo',
        data: [10, 20, 30, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointRadius: 5,
        fill: true,
      },
    ],
  };

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

  return (
    <div className="outer-container">
      <p style={{ fontWeight: 'bold'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SAN RAFAEL</p>
      <div className="chart-container" style={{ height: '500px', width: '100%' }}> {/* Tamaño específico para el contenedor del gráfico */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
