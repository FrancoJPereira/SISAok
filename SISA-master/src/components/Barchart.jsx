import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, BarElement, Title, CategoryScale, LinearScale } from 'chart.js';

// Registrar las escalas y componentes necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const Barchart = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [{
      label: 'Ejemplo de datos',
      data: [10, 20, 30, 40],
      backgroundColor: ['red', 'blue', 'yellow', 'green'],
    }],
  };

  const options = {
    maintainAspectRatio: false, // Permite que el gráfico ignore el aspect ratio del canvas y utilice el tamaño completo especificado.
    responsive: true, // Asegura que el gráfico sea responsivo.
  };

  return (
    <div className="outer-container">
      <p style={{ fontWeight: 'bold' }}>&nbsp;&nbsp;&nbsp;&nbsp;SAN RAFAEL</p>
      <div className="chart-container" style={{ height: '500px', width: '100%' }}> {/* Contenedor con tamaño específico */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Barchart;
