import { useLocation } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import '../styles/CrearGrupo.css';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function CrearReview() {

    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const decodedToken = jwtDecode(token);
    const escritorId = decodedToken.sub; 
    const location = useLocation();
    const { resenadoId, resenadoName, groupId } = location.state ||{};
    if (typeof resenadoId === 'undefined' || typeof resenadoName === 'undefined') {
        console.error('No se recibió el ID o el nombre del reseñado.');}

    const [formValues, setFormValues] = useState({
        content: '',
        like: false,
        userId: resenadoId,
        reviewerId: escritorId
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
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/reviews`, formValues)
      .then(response => {
        console.log(response.data);

        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${resenadoId}`); // Encadenar la siguiente llamada axios
      })
      .then(response => {
        const user = response.data;
        const nuevos_likes = formValues.like ? user.likes + 1 : user.likes; // Usar operador ternario para asignar nuevos_likes

        return axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`, {
            likes: nuevos_likes
        }); // Encadenar la solicitud PUT
      })
      .then(response => {
        console.log('Likes actualizados:', response.data);
        navigate('/ver_companeros', { state: { groupId } }); // Mover navigate al final de la cadena de promesas
      })
      .catch(error => {
        // Manejar errores aquí para todas las promesas encadenadas
        console.error('Hubo un error:', error);
      });
};

  return (
    <div className="form-container">
        <h1>Escribe tu reseña a {resenadoName}</h1>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="input-group">
            <label htmlFor="like-button" className="form-label">Like:</label>
            <span>{formValues.like ? 'Me Gusta' : 'No Me Gusta'}</span>
            <button
                type='button'
                id="like-button"
                name="like"
                className={`form-button ${formValues.like ? 'liked' : ''}`}
                value={formValues.like}
                onChange={handleInputChange}
                onClick={() => setFormValues({ ...formValues, like: !formValues.like })}
                >
                {formValues.like ? 'Quitar me gusta' : 'Dar me gusta'}
              </button>
        </div>
  
        <div className="input-group">
          <label htmlFor="content" className="form-label">Contenido:</label>
          <textarea
            id="content"
            name="content"
            value={formValues.content}
            onChange={handleInputChange}
            className="form-textarea"
          ></textarea>
        </div>
  
        <div className="button-container">
          <button type="submit" className="form-button" >Crear Review</button>
        </div>
      </form>
    </div>
  );
  
}

function navigateTo(path) {
  window.location.href = path;
}

export default CrearReview;