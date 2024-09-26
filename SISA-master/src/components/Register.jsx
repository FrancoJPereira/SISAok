import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Importamos Axios

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    usuario: '',
    email: '',
    password: '',  
    confirmPassword: '',   
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, email, firstName, lastName, usuario } = formData;

    // Validación de contraseñas
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/register', { // Cambia la URL aquí
        firstName: firstName, // Asegúrate de incluir los datos completos
        lastName: lastName,
        username: usuario,
        email: email, 
        password: password,
      });

      if (response.status === 201) {
        toast.success('Registro exitoso. ¡Bienvenido!');
        setFormData({
          firstName: '',
          lastName: '',
          usuario: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        toast.error('Error al registrar. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      toast.error('Error al registrar. Intenta nuevamente.');
    }
  };

  return (
    <div className="register-container" style={{ width: 'auto', height: 'auto' }}>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="register-card">
        <img src="/image/logo.svg" alt="Logo" className="logo" />
        <h2 className="register-title">Registrarse</h2>
        <form className="register-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="firstName">Nombre:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="lastName">Apellido:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="usuario">Usuario:</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              className="form-input"
              value={formData.usuario}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="password">Crea una contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="confirmPassword">Repite la contraseña creada:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          <button className="button-register" type="submit" style={{ width: '100%' }}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
