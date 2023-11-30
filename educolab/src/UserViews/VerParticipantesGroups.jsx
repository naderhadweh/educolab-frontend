import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../styles/GroupsView.css';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import {jwtDecode} from 'jwt-decode';

function VerParticipantesGroups() {
  const location = useLocation();
  const { groupId } = location.state || {}; // Asegúrate de tener una lógica de fallback en caso de que state no esté definido.
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/groups/${groupId}`)
        .then((response) => {
          const groupUsers = response.data.listUsers
          console.log("Lista de usuarios: ", groupUsers)
          //console.log(userGroups)
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
        .then((response) => {
          const users = response.data.filter(user => 
            groupUsers.includes(user.id) // Usar user.id aquí
          );
          setUsers(users);
          console.log("Uusarios del grupo: ", users)
        }).catch((error) => {
          console.log(error);
        });
          

        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000); // Actualiza cada 2 segundos, por ejemplo.
    return () => clearInterval(intervalId);
  }, [groupId]);
  // Ahora puedes usar groupId para buscar y mostrar los participantes del grupo.

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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Cargando usuarios...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button className="solicitar-button" onClick={() => navigateTo('/ver_grupos')}>
        Volver
      </button>
    </main>
  );
}

  
function navigateTo(path) {
    window.location.href = path;
  }
export default VerParticipantesGroups;