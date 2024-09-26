import React from 'react';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa'; // Importa los íconos
import ayudaImage from '/image/emilianoayuda.jpg'; // Asegúrate de que la ruta sea correcta

const Ayuda = () => {
  return (
    <div className="ayuda-container" style={{ padding: '20px', maxWidth: '800px', margin: '3rem', display: 'flex', alignItems: 'center' }}>
      <img src={ayudaImage} alt="Ayuda" style={{ width: '300px', marginRight: '20px' }} />
      <div>
        <h1>Ayuda</h1>
        <p>Esta es la sección de ayuda de la página. Aquí puedes encontrar respuestas a preguntas frecuentes y guías para ayudarte a navegar por la plataforma.</p>
        <p style={{ fontWeight: 'bold' }}>
          <FaExclamationTriangle style={{ verticalAlign: 'middle', marginRight: '5px', color: 'red' }} />
          EL DE LA IZQUIERDA NECESITA AYUDA PISQUIÁTRICA.
        </p>
        <h2>FAQ</h2>
        <ul>
          <li>
            <strong>¿Cómo me registro?</strong> 
            Puedes registrarte haciendo clic en el botón de registro en el formulario que aparece en el <FaHome style={{ verticalAlign: 'middle', marginLeft: '5px' }} />.
          </li>
          <li><strong>¿Cómo puedo cambiar mi contraseña?</strong> Para cambiar tu contraseña, ve a la configuración de tu perfil y selecciona "Cambiar contraseña".</li>
          <li><strong>¿Qué debo hacer si olvido mi contraseña?</strong> Si olvidas tu contraseña, puedes restablecerla utilizando el enlace "Olvidé mi contraseña" en la página de inicio de sesión.</li>
        </ul>

        <h2>Contacto</h2>
        <p>Si necesitas más ayuda, no dudes en contactarnos a través de nuestro formulario de contacto o por correo electrónico a soport@sisa.com.</p>
      </div>
    </div>
  );
};

export default Ayuda;
