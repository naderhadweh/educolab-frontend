import React, { useEffect, useState, useContext } from 'react';
import '../styles/GroupsView.css';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function GroupsView() {

  const navigate = useNavigate();
  const [groups, setGroups] = useState([])
  const { token } = useContext(AuthContext);
  const decodedToken = jwtDecode(token);
  const userId = parseInt(decodedToken.sub, 10); // Obtienes el userId del token decodificado
  const [groupIds, setRequest] = useState([])


  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/groups`)
        .then((response) => {
          const userGroups = response.data.filter(group => 
            parseInt(group.userId, 10) !== userId
          );
          setGroups(userGroups);
          //console.log(userGroups)
        })

        .catch((error) => {
          console.log(error);
        });
    }, 2000); // Actualiza cada 2 segundos, por ejemplo.
    return () => clearInterval(intervalId);
  }, [userId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userId) {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/requests`)
          .then((response) => {
            const userRequests = response.data.filter(request => 
              request.userId === userId
            );
            // Mapear para obtener solo los groupId
            const groupIds = userRequests.map(request => request.groupId);
            setRequest(groupIds); // Asumiendo que quieres establecer esto en tu estado
            console.log(groupIds); // Ver los groupIds en la consola
            console.log("Grupos a los que he request:", userRequests)
          }).catch((error) => {
            console.log(error);
          });
      }
    }, 2000); // Actualiza cada 2 segundos, por ejemplo.
    return () => clearInterval(intervalId); // Limpieza del intervalo al desmontar el componente
  }, [userId]); // Dependencia correcta

  function handleViewParticipants(groupId) {
    navigate('/ver_participantes', { state: { groupId } });
  }

  return (
    <main className="groupsview-main">
      <div className="groupsview">
        <h1>¿Te quieres inscribir a algún grupo?</h1>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Asignatura</th>
              <th>Lugar</th>
              <th>Límite</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groups).length > 0 ? (
              Object.values(groups).map(group => (
                <tr key={group.id}>
                  <td>{group.fecha}</td>
                  <td>{group.asignature}</td>
                  <td>{group.place}</td>
                  <td>{group.limit}</td>
                  <td>{group.description}</td>
  
                  <td>
                    {group.listUsers.length >= group.limit ? (
                      <button className="lleno-button" disabled>
                        Lleno
                      </button>
                    ) : groupIds.includes(group.id) ? (
                      <button className="solicitado-button" disabled>
                        Solicitado
                      </button>
                    ) : (
                      <button className="solicitar-button" onClick={() => solicitar(userId, group.id)}>
                        Solicitar unirse
                      </button>
                    )}
                    <button className="ver-button" onClick={() => handleViewParticipants(group.id)}>
                      Ver participantes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // Puedes renderizar algo mientras los grupos están siendo cargados
              <tr>
                <td colSpan="6">Cargando grupos...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
  
function solicitar(id_solicitante, group_id) {
  const formValues = {groupId: parseInt(group_id,10), userId: parseInt(id_solicitante, 10)}
  axios.post(`${import.meta.env.VITE_BACKEND_URL}/requests`, formValues)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        // Manejar errores aquí
        console.error('Hubo un error al crear la request:', error);
      });
}
}

function navigateTo(path) {
  window.location.href = path;
}

export default GroupsView;
