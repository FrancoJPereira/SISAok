import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });

      // Verifica si la respuesta contiene el token
      if (response.data.token) { // Cambié esto para verificar el token
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setErrorMessage('Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response ? error.response.data : error);
      // Muestra el mensaje de error que venga del backend
      setErrorMessage(error.response ? error.response.data.message : 'Error de autenticación. Por favor, intenta de nuevo.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  return (
    <div className='form-container'>
      <img src="/image/logo.svg" alt="Logo" className="logo" style={{ width: '12rem', paddingLeft: '6rem' }} />
      <h2>Sistema Integrado de Salud Argentina</h2>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor='username'>Nombre de usuario</label>
        <input 
          type='text' 
          id='username' 
          name='username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label htmlFor='password'>Contraseña</label>
        <input 
          type='password' 
          id='password' 
          name='password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Muestra un mensaje de error si hay uno */}
        <button type="submit">Iniciar sesión</button>
        <button type="button" onClick={handleRegisterClick}>Registrarse</button>
        <p 
          onClick={handleForgotPasswordClick} 
          style={{ 
            marginTop: '10px', 
            color: '#007bff',
            cursor: 'pointer',
            fontSize: '0.9rem',
            textDecoration: 'underline',
            textAlign: 'center'
          }}
        >
          Olvidé mi contraseña
        </p>
      </form>
    </div>
  );
}

export default Home;
