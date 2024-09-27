import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEye, FaEyeSlash, FaTrashAlt, FaSave, FaEraser } from 'react-icons/fa';

const Caso = () => {
  const [casos, setCasos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [enfermedad, setEnfermedad] = useState('');
  const [dni, setDni] = useState<number | undefined>(undefined);
  const [telefono, setTelefono] = useState<number | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [showCases, setShowCases] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch cases from backend
  useEffect(() => {
    const fetchCasos = async () => {
      try {
        console.log('Solicitando casos...');
        const response = await axios.get('http://localhost:3000/casos'); // Cambia la URL según tu configuración
        console.log('Datos recibidos:', response.data);
        setCasos(response.data);
      } catch (error) {
        console.error('Error al obtener los casos:', error);
      }
    };
    fetchCasos();
  }, []);

  const agregarCaso = async () => {
    const nuevoCaso = { nombre, apellido, enfermedad, dni, telefono };

    if (isEditing) {
      try {
        const casoParaEditar = casos[editingIndex];
        const response = await axios.put(`http://localhost:3000/casos/${casoParaEditar.id}`, nuevoCaso);
        const nuevosCasos = [...casos];
        nuevosCasos[editingIndex] = response.data;
        setCasos(nuevosCasos);
        setIsEditing(false);
        setEditingIndex(null);
      } catch (error) {
        console.error('Error al actualizar el caso:', error);
    }

    } else
    try {
      console.log('Enviando nuevo caso:', nuevoCaso);
      const response = await axios.post('http://localhost:3000/casos', nuevoCaso);
      console.log('Caso agregado:', response.data);
      setCasos([...casos, response.data]);
      limpiarInputs();
      setShowForm(false);
    } catch (error) {
      console.error('Error al agregar el caso:', error);
    }
    limpiarInputs();
    setShowForm(false);
  };

  const editarCaso = (index) => {
    const casoParaEditar = casos[index];
    setNombre(casoParaEditar.nombre);
    setApellido(casoParaEditar.apellido);
    setEnfermedad(casoParaEditar.enfermedad);
    setDni(casoParaEditar.dni);
    setTelefono(casoParaEditar.telefono);
    setIsEditing(true);
    setEditingIndex(index);
    setShowForm(true); // Mostrar el formulario con los datos precargados
  };

  const borrarCaso = async (index) => {
    const casoParaEliminar = casos[index];
    try {
      console.log('Eliminando caso con ID:', casoParaEliminar.id);
      await axios.delete(`http://localhost:3000/casos/${casoParaEliminar.id}`); // Asegúrate de que el backend soporte la eliminación
      const nuevosCasos = casos.filter((_, i) => i !== index);
      setCasos(nuevosCasos);
    } catch (error) {
      console.error('Error al eliminar el caso:', error);
    }
  };

  const limpiarInputs = () => {
    setNombre('');
    setApellido('');
    setEnfermedad('');
    setDni('');
    setTelefono('');
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    if (showCases) {
      setShowCases(false);
    }
  };

  const toggleCases = () => {
    setShowCases((prev) => !prev);
    if (showForm) {
      setShowForm(false);
    }
  };

  const styles = {
    container: {
      margin: '5rem 40rem',
      padding: '4rem',
      backgroundColor: 'whitesmoke',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '50dvh',
      fontFamily: "'Roboto', sans-serif",
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
    },
    smallButton: {
      backgroundColor: '#5486c4',
      color: 'white',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    smallButtonHover: {
      backgroundColor: '#8db45a',
    },
    formContainer: {
      marginTop: '1rem',
    },
    input: {
      padding: '0.70rem',   
      marginBottom: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '1rem',
      width: '95%',
    },
    formButtons: {
      display: 'flex',
      gap: '1rem',
    },
    caseList: {
      marginTop: '2rem',
    },
    caseTable: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    caseTableHeader: {
      backgroundColor: '#f2f2f2',
    },
    caseTableCell: {
      border: '1px solid #ccc',
      padding: '0.5rem',
      textAlign: 'left',
    },
    deleteButton: {
      backgroundColor: '#c44',
      color: 'white',
      border: 'none',
      padding: '0.5rem',
      cursor: 'pointer',
      borderRadius: '4px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center' }}>Gestión de casos</h1>
      <div style={styles.buttonContainer}>
        <button
          style={styles.smallButton}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.smallButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.smallButton.backgroundColor)}
          onClick={toggleForm}
        >
          <FaPlus /> {isEditing ? 'Cancelar Edición' : 'Agregar Caso'}
        </button>
        <button
          style={styles.smallButton}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.smallButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.smallButton.backgroundColor)}
          onClick={toggleCases}
        >
          {showCases ? <FaEyeSlash /> : <FaEye />} Mostrar Casos
        </button>
      </div>

      {showForm && (
        <div style={styles.formContainer}>
           <h2>{isEditing ? 'Editar Caso' : 'Agregar nuevo caso'}</h2>
          <input
            style={styles.input}
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Enfermedad"
            value={enfermedad}
            onChange={(e) => setEnfermedad(e.target.value)}
          />
          <input
            style={styles.input}
            type="number"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(Number(e.target.value))}
          />
          <input
            style={styles.input}
            type="number"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(Number(e.target.value))}
          />
          <div style={styles.formButtons}>
            <button
              style={styles.smallButton}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.smallButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.smallButton.backgroundColor)}
              onClick={agregarCaso}
            >
              <FaSave /> {isEditing ? 'Actualizar Caso' : 'Guardar Caso'}
            </button>
            <button
              style={styles.smallButton}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.smallButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.smallButton.backgroundColor)}
              onClick={limpiarInputs}
            >
              <FaEraser /> Limpiar
            </button>
          </div>
        </div>
      )}

      {showCases && (
        <div style={styles.caseList}>
          <h2>Casos Asignados</h2>
          <table style={styles.caseTable}>
            <thead style={styles.caseTableHeader}>
              <tr>
                <th style={styles.caseTableCell}>Nombre</th>
                <th style={styles.caseTableCell}>Apellido</th>
                <th style={styles.caseTableCell}>Enfermedad</th>
                <th style={styles.caseTableCell}>DNI</th>
                <th style={styles.caseTableCell}>Teléfono</th>
                <th style={styles.caseTableCell}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {casos.map((caso, index) => (
                <tr key={index}>
                  <td style={styles.caseTableCell}>{caso.nombre}</td>
                  <td style={styles.caseTableCell}>{caso.apellido}</td>
                  <td style={styles.caseTableCell}>{caso.enfermedad}</td>
                  <td style={styles.caseTableCell}>{caso.dni}</td>
                  <td style={styles.caseTableCell}>{caso.telefono}</td>
                  <td style={styles.caseTableCell}>
                    <button style={styles.deleteButton} onClick={() => borrarCaso(index)}>
                      <FaTrashAlt /> Eliminar
                    </button>
                    <button style={styles.editButton} onClick={() => editarCaso(index)}>
                    <FaEdit /> Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Caso;
