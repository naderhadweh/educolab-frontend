// CrearGrupo.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import '../styles/CrearGrupo.css';
import {jwtDecode} from 'jwt-decode';

function CrearGrupo() {

    const { token } = useContext(AuthContext);
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub; // Obtienes el userId del token decodificado

    const [formValues, setFormValues] = useState({
        asignature: '',
        fecha: '',
        place: '',
        limit: '',
        description: '',
        userId: userId,
        listUsers: [userId]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí enviarías los datos a tu API/backend para crear el grupo
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/groups`, formValues)
      .then(response => {
        // Manejar la respuesta del servidor
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/chats`, {type: 'Estudio',
      content: [],
      groupId: response.data.id
        });
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/chats`, {type: 'Offtopic',
        content: [],
        groupId: response.data.id
          });
        console.log(response.data);
        navigateTo('/home_page');
        // Aquí puedes redireccionar al usuario o mostrar un mensaje de éxito
      })
      .catch(error => {
        // Manejar errores aquí
        console.error('Hubo un error al crear el grupo:', error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-content">
        <div className="input-group">
          <label htmlFor="asignature" className="form-label">Asignatura:</label>
          <input
            type="text"
            id="asignature"
            name="asignature"
            value={formValues.asignature}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
  
        <div className="input-group">
          <label htmlFor="fecha" className="form-label">Fecha y hora:</label>
          <input
            type="datetime-local"
            id="fecha"
            name="fecha"
            value={formValues.fecha}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
  
        <div className="input-group">
          <label htmlFor="place" className="form-label">Lugar:</label>
          <input
            type="text"
            id="place"
            name="place"
            value={formValues.place}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
  
        <div className="input-group">
          <label htmlFor="limit" className="form-label">Límite de participantes:</label>
          <input
            type="number"
            id="limit"
            name="limit"
            value={formValues.limit}
            onChange={handleInputChange}
            className="form-input"
            min="1"
            max="10"
          />
        </div>
  
        <div className="input-group">
          <label htmlFor="description" className="form-label">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            className="form-textarea"
          ></textarea>
        </div>
  
        <div className="button-container">
          <button type="submit" className="form-button" >Crear Grupo</button>
        </div>
      </form>
    </div>
  );
  
}

function navigateTo(path) {
  window.location.href = path;
}

export default CrearGrupo;