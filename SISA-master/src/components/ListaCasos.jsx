import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai'; // Icono para el botón Eliminar

const ListaCasos = ({ casos, borrarCaso }) => {
  const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '2rem',
    },
    th: {
      backgroundColor: '#5486c4',
      color: 'white',
      padding: '0.75rem',
      textAlign: 'left',
      fontWeight: 'bold',
      borderBottom: '2px solid #ddd',
    },
    td: {
      padding: '0.75rem',
      borderBottom: '1px solid #ddd',
      textAlign: 'left',
    },
    deleteButton: {
      backgroundColor: '#c44',
      padding: '5px 10px',
      border: 'none',
      color: 'white',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    buttonIcon: {
      marginRight: '0.5rem', // Espaciado entre ícono y texto
    },
  };

  return (
    <div>
      <h2>Casos Asignados</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Apellido</th>
            <th style={styles.th}>Enfermedad</th>
            <th style={styles.th}>DNI</th>
            <th style={styles.th}>Teléfono</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {casos.map((caso, index) => (
            <tr key={index}>
              <td style={styles.td}>{caso.nombre}</td>
              <td style={styles.td}>{caso.apellido}</td>
              <td style={styles.td}>{caso.enfermedad}</td>
              <td style={styles.td}>{caso.dni}</td>
              <td style={styles.td}>{caso.telefono}</td>
              <td style={styles.td}>
                <button
                  style={styles.deleteButton}
                  onClick={() => borrarCaso(index)}
                >
                  <AiOutlineDelete style={styles.buttonIcon} />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaCasos;
