import './styles/HomePage.css';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './auth/AuthContext';
import {jwtDecode} from 'jwt-decode'; // Importación corregida
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.sub; // Asegúrate de que 'sub' es el campo correcto.
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [userId]); // Añadido userId a las dependencias

  useEffect(() => {
 
    const intervalId = setInterval(() => {

    if (user.id) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/groups`)
        .then((response) => {
          const userGroups = response.data.filter(group => 
            group.listUsers.includes(user.id) // Usar user.id aquí
          );
          setGroups(userGroups);
        }).catch((error) => {
          console.log(error);
        });
    } }, 2000); // Actualiza cada 2 segundos, por ejemplo.
  }, [user.id]); // Dependencia correcta

  function navigateTo(path) {
    window.location.href = path;
  }
  function handleViewParticipants(groupId) {
    navigate('/ver_companeros', { state: { groupId } });
  }

  function handleViewChat(groupId, tipo_chat) {
    navigate('/chat', { state: { id_grupo: groupId, tipo: tipo_chat, nombre: user.name } });
  }


  function salir(groupId, lista_usuarios) {
    const lista_actualizada = lista_usuarios.filter(id => id !== parseInt(userId, 10));
    console.log(lista_actualizada)
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/groups/${groupId}`, {
      listUsers: lista_actualizada,
     })
     .then((response) => {
       console.log('Grupo actualizado correctamente:', response.data);
     })
     .catch((error) => {
       console.error('Hubo un error al actualizar la lista de usuarios del grupo:', error);
     });
  }


  function eliminarGrupo(id_grupo) {
    // Eliminar el grupo
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/groups/${id_grupo}`)
      .then((response) => {
        console.log('Grupo eliminado correctamente:', response.data);
  
        // Obtener todas las requests relacionadas con el grupo
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/requests`).then((responseRequests) => {
          const requestsToDelete = responseRequests.data.filter(request =>
            request.groupId === parseInt(id_grupo, 10)
          );
  
          // Eliminar cada request
          const deleteRequestPromises = requestsToDelete.map((request) =>
            axios.delete(`${import.meta.env.VITE_BACKEND_URL}/requests/${request.id}`)
          );
  
          // Obtener todos los chats relacionados con el grupo
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/chats`).then((responseChats) => {
            const chatsToDelete = responseChats.data.filter(chat =>
              chat.groupId === parseInt(id_grupo, 10)
            );
  
            // Eliminar cada chat
            const deleteChatPromises = chatsToDelete.map((chat) =>
              axios.delete(`${import.meta.env.VITE_BACKEND_URL}/chats/${chat.id}`)
            );
  
            // Ejecutar todas las solicitudes de eliminación en paralelo
            Promise.all([...deleteRequestPromises, ...deleteChatPromises])
              .then((deleteResponses) => {
                const requestDeleteResponses = deleteResponses.slice(0, requestsToDelete.length);
                const chatDeleteResponses = deleteResponses.slice(requestsToDelete.length);
                // Manejar la respuesta de la eliminación de requests
                console.log('Requests eliminadas correctamente:', requestDeleteResponses.map(response => response.data));
                // Manejar la respuesta de la eliminación de chats
                console.log('Chats eliminados correctamente:', chatDeleteResponses.map(response => response.data));
              })
              .catch((deleteError) => {
                console.error('Hubo un error al eliminar requests o chats:', deleteError);
              });
          });
        });
      })
      .catch((error) => {
        console.error('Hubo un error al eliminar el grupo:', error);
      });
  }
  
  
  

  // function eliminarGrupo(group_id) {
  //   axios.delete(`${import.meta.env.VITE_BACKEND_URL}/chats`, {
  //     data: {
  //         groupId: parseInt(group_id, 10)
  //     }
  // })
  //     .then((response) => {
  //         console.log('Chats eliminados correctamente:', response.data);
  //         axios.delete(`${import.meta.env.VITE_BACKEND_URL}/groups/${group_id}`)
  //         .then((response) => {
  //           console.log('Grupo eliminado correctamente:', response.data);
  //         })
  //         .catch((error) => {
  //           console.error('Hubo un error al eliminar el grupo:', error);
  //         });
  //     })
  //     .catch((error) => {
  //         console.error('Hubo un error al eliminar los chats:', error);
  //     });
    
  // }

  return (
    <div className="home-page">
      <main className="home-main">
        <section id="hero" className="landing-hero">
          <div className="hero-content">
            <div className="hero-left">
              <h2 className="hero-title">Bienvenido {user.name}</h2> {/* Asegúrate de que 'name' es el campo correcto */}
            </div>
            <div className="hero-right">
              <button className="mis-datos-button" onClick={() => navigateTo('/mis_datos')}>
                Mis Datos
              </button>
              <button className="create-button" onClick={() => navigateTo('/crear_grupo')}>
                Crear Grupo de Estudio
              </button>
              <button className="view-button" onClick={() => navigateTo('/ver_grupos')}>
                Ver Grupos de Estudio
              </button>
              <button className="view-button" onClick={() => navigateTo('/ver_requests')}>
                Ver Requests
              </button>
            </div>
          </div>
        </section>

        <h1>Mi Feed</h1>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Asignatura</th>
              <th>Lugar</th>
              <th>Chats</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id}>
                <td>{group.fecha}</td>
                <td>{group.asignature}</td> {/* Asegúrate de que 'asignature' es el campo correcto */}
                <td>{group.place}</td> {/* Asegúrate de que 'place' es el campo correcto */}
                <td>
                  <button className="companeros" onClick={() => handleViewParticipants(group.id)}>Ver Compañeros</button>
                  <button className="chat-estudio-button" onClick={() => handleViewChat(group.id, "Estudio")}>Chat de estudio</button>
                  <button className="chat-offtopic-button" onClick={() => handleViewChat(group.id, "Offtopic")}>Chat Offtopic</button>
                  {parseInt(userId, 10) === group.userId ? (
                      <button className="salir-button" onClick={() => eliminarGrupo(group.id)}> 
                        Eliminar Grupo
                      </button> 
                    ) : (
                      <button className="salir-button" onClick={() => salir(group.id, group.listUsers)}>
                        Salir del Grupo
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default HomePage;