import React, { useEffect, useState, useContext } from 'react';
import '../styles/RequestsView.css';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import {jwtDecode} from 'jwt-decode';

function RequestsView() {

  const { token } = useContext(AuthContext);
  const decodedToken = jwtDecode(token);
  const userId = parseInt(decodedToken.sub, 10); // Obtienes el userId del token decodificado
  const [solicitantesIds, setSolicitantesIds] = useState([])
  const [groups_ids, setGroupsIds] = useState([])
  const [users, setUsers] = useState([])
  const [relacionesRequest, setRelacionRequests] = useState([])
  const [MisGrupos, setMisGrupos] = useState([])
  const [usersSolicitantes, setUsersSolicitantes] = useState([])


// ...

  // Función asincrónica para cargar todos los datos necesarios
  const loadInitialData = async () => {
    try {
      // Obtén los grupos del usuario
      const groupsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/groups`);
      const userGroups = groupsResponse.data.filter(
        (group) => parseInt(group.userId, 10) === userId
      );
      setMisGrupos(userGroups);
      const groupIds = userGroups.map((group) => group.id);
      setGroupsIds(groupIds);

      // Obtén las solicitudes relacionadas con los grupos del usuario
      const requestsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/requests`);
      const userRequests = requestsResponse.data.filter((request) =>
        groupIds.includes(request.groupId)
      );
      const userRequestsId = userRequests.map((request) => request.userId);
      setRelacionRequests(userRequests);
      setSolicitantesIds(userRequestsId);

      // Si hay solicitudes, obtén la información de los usuarios solicitantes
      if (userRequestsId.length > 0) {
        const usersResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`);
        const usersSolicitantes = usersResponse.data.filter((user) =>
          userRequestsId.includes(user.id)
        );
        setUsersSolicitantes(usersSolicitantes);
      }
    } catch (error) {
      console.error('Error al cargar datos iniciales:', error);
    }
  };
 // Solo se ejecutará una vez al montar el componente debido a que `userId` no cambia

useEffect(() => {
  const refreshInterval = setInterval(() => {
    loadInitialData();
    console.log("Actualizando")
  }, 3000);

  // Limpia el temporizador cuando el componente se desmonta o cuando ya no se necesita
  return () => clearInterval(refreshInterval);
}, []);

  if (relacionesRequest.length > 0) {
    return (
      <main className="groupsview-main">
        <div className="groupsview">
          <h1>Ver solicitudes a mis grupos</h1>
          <table>
            <thead>
              <tr>
                <th>Nombre solicitante</th>
                <th>Cantidad de likes</th>
                <th>Asignatura</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {relacionesRequest.map((request, index) => {
                const usuarioSolicitante = usersSolicitantes.find(
                  (user) => user.id === request.userId
                );
                const grupoSolicitado = MisGrupos.find(
                  (grupo) => grupo.id === request.groupId
                );
  
                return (
                  <tr key={index}>
                    <td>{usuarioSolicitante?.name}</td>
                    <td>{usuarioSolicitante?.likes}</td>
                    <td>{grupoSolicitado?.asignature}</td>
                    <td>{grupoSolicitado?.fecha}</td>
                    <td>
                      <button className="aceptar-button"  onClick={() => aceptar(usuarioSolicitante.id, grupoSolicitado.id)}>
                        Aceptar
                      </button>
                      <button className="rechazar-button" onClick={() => rechazar(usuarioSolicitante.id, grupoSolicitado.id)}>
                        Rechazar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    );}

    else {
        return (
          <main className="groupsview-main">
            <div className="groupsview">
              <h1>No hay solicitudes</h1>
            </div>
          </main>
        );
      }
}

function aceptar(id_solicitante, group_id) {
  // Obtener la información del grupo
  axios.get(`${import.meta.env.VITE_BACKEND_URL}/groups/${group_id}`)
    .then(response => {
      // Obtener la lista actual de usuarios
      const listaUsuarios = response.data.listUsers;

      // Agregar el nuevo id_solicitante a la lista
      listaUsuarios.push(id_solicitante);

      // Realizar una solicitud PUT para actualizar la lista de usuarios
      axios.put(`${import.meta.env.VITE_BACKEND_URL}/groups/${group_id}`, {
        listUsers: listaUsuarios
      }).then(response => {
        console.log('Usuario aceptado correctamente:', response.data);
      })
      .catch(error => {
        // Manejar errores al hacer la solicitud PUT
        console.error('Hubo un error al actualizar la lista de usuarios:', error);
      });

      axios.get(`${import.meta.env.VITE_BACKEND_URL}/requests`)
      .then(response => {
      // Encontrar la solicitud correspondiente
      const solicitud = response.data.find(request => 
        request.groupId === group_id && request.userId === id_solicitante
      );

      if (solicitud) {
        // Obtener el ID de la solicitud
        const request_id = solicitud.id;
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/requests/${request_id}`)
        console.log("ID REQUEST: ", request_id)
      } else {
        console.log('No se encontró la solicitud correspondiente.');
      }
    }).catch(error => {
      // Manejar errores al obtener la lista de solicitudes
      console.error('Hubo un error al obtener la lista de solicitudes:', error);
    });

    })
    .catch(error => {
      // Manejar errores al obtener la información del grupo
      console.error('Hubo un error al obtener la información del grupo:', error);
    });


}

function rechazar(id_solicitante, group_id) {
  // Obtener la información del grupo
  axios.get(`${import.meta.env.VITE_BACKEND_URL}/requests`)
      .then(response => {
      // Encontrar la solicitud correspondiente
      const solicitud = response.data.find(request => 
        request.groupId === group_id && request.userId === id_solicitante
      );
      if (solicitud) {
        // Obtener el ID de la solicitud
        const request_id = solicitud.id;
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/requests/${request_id}`)
        console.log("ID REQUEST: ", request_id)
      } else {
        console.log('No se encontró la solicitud correspondiente.');
      }
    }).catch(error => {
      // Manejar errores al obtener la lista de solicitudes
      console.error('Hubo un error al obtener la lista de solicitudes:', error);
    });

}


export default RequestsView;