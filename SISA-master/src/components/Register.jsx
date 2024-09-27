import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    usuario: '',
    email: '',
    password: '',  
    confirmPassword: '',   
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, email, name, surname, usuario } = formData;

    // Validación de contraseñas
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/register', { // Cambia la URL aquí
        name,
        surname,
        username: usuario,
        email, 
        password,
      });

      if (response.status === 201) {
        toast.success('Registro exitoso. ¡Bienvenido!');
        setFormData({
          name: '',
          surname: '',
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

  const generatePassword = (length = 12) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let password = ''
    for (let i = 0; i < length; i++){
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setFormData({
      ...formData,
      password: newPassword,
      confirmPassword: newPassword,
    });
    setShowPassword(true); 
    toast.info('Contraseña generada. Por favor, memoriza esta contraseña.');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container" style={{ width: 'auto', height: 'auto' }}>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="register-card">
        <img src="/image/logo.svg" alt="Logo" className="logo" />
        <h2 className="register-title">Registrarse</h2>
        <form className="register-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="surname">Apellido:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              className="form-input"
              value={formData.surname}
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

          {/* Contraseña */}
          <div className="form-group" style={{ marginBottom: '15px', position: 'relative' }}>
            <label htmlFor="password">Crea una contraseña:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{ position: 'absolute', right: '10px', top: '30px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirmar Contraseña */}
          <div className="form-group" style={{ marginBottom: '20px', position: 'relative' }}>
            <label htmlFor="confirmPassword">Repite la contraseña creada:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{ position: 'absolute', right: '10px', top: '30px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="button" onClick={handleGeneratePassword} style={{ marginBottom: '15px', width: '100%' }}>
            Generar Contraseña Aleatoria
          </button>
          <button className="button-register" type="submit" style={{ width: '100%' }}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
