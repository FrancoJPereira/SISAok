import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaDatabase, FaQuestionCircle, FaUser } from 'react-icons/fa'; 
import Dashboard from './Dashborad'; // Corrige la ruta aquí
import Home from './Home'; 
import Register from './Register'; 
import Piechart from './Piechart';
import BarChart from './Barchart';
import LineChart from "./Linechart";
import Caso from './Caso';
import Ayuda from './Ayuda';


const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Mostrar mensaje de bienvenida solo en "/" y "/register"
  const showWelcome = location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="main-wrap" style={{ height: 'auto' }}>
      <img 
        src="/image/logo.svg" 
        alt="Logo" 
        className="logo"
        style={{ position: 'absolute', width: '80px', height: '80px', paddingBlock: '2rem' }} 
      />

      <div className={`main-head ${isOpen ? 'active' : ''}`}>
        <div onClick={toggleSidebar} className="toggler">
          {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
        </div>
        <nav className="main-nav">
          <ul className="navbar-nav">
            <li className="nav-list-item">
              <Link to="/" className="nav-link">
                <FaHome />
                <span className="link-text">Inicio</span>
              </Link>
            </li>
            <li className="nav-list-item">
              <Link to="/" className="nav-link">
                <FaUser />
                <span className="link-text">Usuarios</span>
              </Link>
            </li>
            <li className="nav-list-item">
              <Link to="/dashboard" className="nav-link"> {/* Cambiar la ruta a /dashboard */}
                <FaDatabase />
                <span className="link-text">Datos</span>
              </Link>
            </li>
            <li className="nav-list-item">
              <Link to="/ayuda" className="nav-link">
                <FaQuestionCircle />
                <span className="link-text">Ayuda</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="content" style={{ display: 'flex'}}>
        {showWelcome && (
          <div className="welcome-message">
            <h1>BIENVENIDO</h1>
            <p style={{ fontWeight: 'bold' }}>Sistema Integrado de Salud de Argentina.</p>
            <p>Una plataforma diseñada para transformar la manera en que los ciudadanos acceden a los servicios de salud en todo el país. 
              Nuestro objetivo es ofrecer una experiencia fluida y eficiente, garantizando que todos los habitantes de Argentina puedan acceder a la atención médica necesaria sin importar su ubicación geográfica.
              Le invitamos a navegar por el menú a su izquierda.</p> 
            <p style={{ fontWeight: 'bold' }}>¡Gracias por ser parte de esta iniciativa!</p>
          </div>
        )}
      </div>

      <div className="home-inicio">
        {location.pathname === '/' && <Home />} {/* Home */}
        {location.pathname === '/register' && <Register />} {/* Register */}
        {location.pathname === '/caso' && <Caso />} {/* Caso */}
        {location.pathname === '/ayuda' && <Ayuda />} {/* Ayuda */}
        {location.pathname === '/dashboard' && <Dashboard />} {/* Dashboard */}
      </div>

      <div className="chart-graficos">
        {location.pathname === "/piechart" && <Piechart />} {/* Piechart */}
        {location.pathname === "/barchart" && <BarChart />} {/* BarChart */}
        {location.pathname === "/linechart" && <LineChart />} {/* LineChart */}
      </div>
    </div>  
  );
};

export default Layout;
