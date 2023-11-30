import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../styles/GroupsView.css';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function VerCompaneros() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.sub;
  const location = useLocation();
  const { groupId } = location.state || {}; // Asegúrate de tener una lógica de fallback en caso de que state no esté definido.
  const [users, setUsers] = useState([]);
  const [resenadosIds, setResenadosIds] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/groups/${groupId}`)
        .then((response) => {
          const groupUsers = response.data.listUsers;
          console.log("Lista de usuarios: ", groupUsers);

          axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
            .then((responseUsers) => {
              const users = responseUsers.data.filter(user => 
                groupUsers.includes(user.id) && user.id !== parseInt(userId, 10)
              );
              setUsers(users);
              console.log("Usuarios del grupo: ", users);
            })
            .catch((error) => {
              console.log(error);
            });

          axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews`)
            .then((responseReviews) => {
              const resenados = responseReviews.data.filter(review => 
                review.reviewerId === parseInt(userId, 10)
              );
              console.log("resenados:", resenados)
              const resenadosUserIds = resenados.map(review => review.userId);
              setResenadosIds(resenadosUserIds);
              console.log("UserIds de resenados: ", resenadosUserIds);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [groupId, userId]);

  // Ahora puedes usar groupId para buscar y mostrar los participantes del grupo.
  function FuncionReview(user_id, user_name, id_grupo) {
    if (typeof user_id === 'undefined' || typeof user_name === 'undefined') {
      console.error('El ID del usuario o el nombre es undefined.');
      return;
    }
    navigate('/crear_review', { state: { resenadoId: user_id, resenadoName: user_name, groupId: id_grupo } });
  }
  return (
    <main className="groupsview-main">
      <div className="groupsview">
        <h1>Usuarios del grupo</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Carrera</th>
              <th>Likes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
  {users && users.length > 0 ? (
    users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.career}</td>
        <td>{user.likes}</td>
        {resenadosIds.includes(user.id) ? (
          <td>Reseñado</td>
        ) : (
          <td>
            <button onClick={() => FuncionReview(user.id, user.name, groupId)}>Hacer Review</button>
          </td>
        )}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4">Esperando que aparezcan los participantes...</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
      <button className="solicitar-button" onClick={() => navigateTo('/home_page')}>
        Volver
      </button>
    </main>
  );
}

  
function navigateTo(path) {
    window.location.href = path;
  }
export default VerCompaneros;