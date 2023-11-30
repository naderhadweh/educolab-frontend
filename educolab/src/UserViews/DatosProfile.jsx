import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../styles/DatosProfile.css';

function DatosProfile() {
  const { token } = useContext(AuthContext);
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.sub; // Asegúrate de que 'sub' es el campo correcto.
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar la edición

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]); // Añadido userId a las dependencias

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (atributo, nuevo_valor) => {
    console.log(atributo)
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`, {
       [atributo]: nuevo_valor,
      })
      .then((response) => {
        console.log('Usuario actualizado correctamente:', response.data);
      })
      .catch((error) => {
        // Manejar errores al hacer la solicitud PUT
        console.error('Hubo un error al actualizar la lista de usuarios:', error);
      });
    setIsEditing(false);
  };

  return (
    <div className="mis-datos">
      <div className="perfil-info">
        <img
          src="src/fotos/estudiante.jpeg"
          alt="Foto de Lukas Andrade"
          className="foto-perfil"
        />
        <div className="datos-personales">
          <h2>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <button className="edit-button" onClick={() => handleSaveClick('name', user.name)}>Guardar</button>
              </>
            ) : (
              <>
                {user.name}
                <button className="edit-button" onClick={handleEditClick}>Editar</button>
              </>
            )}
          </h2>
          <p>
            Carrera:{' '}
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={user.career}
                  onChange={(e) => setUser({ ...user, career: e.target.value })}
                />
                <button className="edit-button" onClick={() => handleSaveClick('career', user.career)}>Guardar</button>
              </>
            ) : (
              <>
                {user.career}
                <button  className="edit-button" onClick={handleEditClick}>Editar</button>
              </>
            )}
          </p>
          <p>
            Teléfono:{' '}
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
                <button className="edit-button" onClick={() => handleSaveClick('phone', user.phone)}>Guardar</button>
              </>
            ) : (
              <>
                {user.phone}
                <button className="edit-button" onClick={handleEditClick}>Editar</button>
              </>
            )}
          </p>
          <p>
            Correo Electrónico:{' '}
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <button className="edit-button" onClick={() => handleSaveClick('email', user.email)}>Guardar</button>
              </>
            ) : (
              <>
                {user.email}
                <button className="edit-button" onClick={handleEditClick}>Editar</button>
              </>
            )}
          </p>
          <div className="logros">
            <div className="logro">
              <h3>Has recibido {user.likes} Me Gustas</h3>
            </div>
            <div className="button-container">
              <button onClick={() => navigateTo('/ver_reviews')}>Ver Reviews</button>
              <button onClick={() => navigateTo('/home_page')}>Volver</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
function navigateTo(path) {
  window.location.href = path;
}

export default DatosProfile;
