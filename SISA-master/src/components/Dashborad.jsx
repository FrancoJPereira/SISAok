import React from 'react';
import PieChart from './Piechart';
import BarChart from './Barchart';
import LineChart from './Linechart';
import { FaWhatsapp } from 'react-icons/fa';

const Dashboard = () => {
  const handleWhatsAppShare = () => {
    const url = 'https://wa.me/?text=Check%20out%20this%20dashboard%20data!';
    window.open(url, '_blank');
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">DATOS PÚBLICOS</h1>
      <div className="dashboard-grid">
        <div className="chart-container outer-container">
          <PieChart />          
        </div>
        <div className="chart-container outer-container">
          <BarChart />          
        </div>
        <div className="chart-container outer-container">
          <LineChart />          
        </div>
        <button className="whatsapp-button" onClick={handleWhatsAppShare}>
            <FaWhatsapp /> Compartir
          </button>
      </div>
    </div>
  );
};

export default Dashboard;
