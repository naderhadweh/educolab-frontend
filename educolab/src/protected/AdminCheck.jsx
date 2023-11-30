import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { AuthContext } from "../auth/AuthContext";
import '../styles/HomePage.css';

function AdminCheck() {
    const { token } = useContext(AuthContext);
    const [msg, setMsg] = useState('');
    const [isAdmin, setAdmin] = useState(false);
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);

    const config = {
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protectedadmin`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
      axios(config)
          .then((response) => {
              setMsg(response.data.message);
              setAdmin(true);
              axios.get(`${import.meta.env.VITE_BACKEND_URL}/groups`)
                  .then((response) => {
                      const userGroups = response.data;
                      setGroups(userGroups);
                      console.log(userGroups);
                  })
                  .catch((error) => {
                      console.log(error);
                  });
              axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
                  .then((response) => {
                      const usersResponse = response.data.filter(user => user.email !== 'admin@uc.cl');
                      setUsers(usersResponse);
                      console.log(users);
                  })
                  .catch((error) => {
                      console.log(error);
                  });
              axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews`)
                  .then((response) => {
                      const reviewsResponse = response.data;
                      setReviews(reviewsResponse);
                      console.log(users);
                  })
                  .catch((error) => {
                      console.log(error);
                  });
          })
          .catch((error) => {
              setMsg(error.message);
          });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
        actualizarUsuariosYGrupos();
    }, 5000);

    return () => {
        clearInterval(intervalId);
    };
}, [groups, users]);

  function actualizarUsuariosYGrupos() {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/groups`)
          .then(response => {
              setGroups(response.data);
          })
          .catch(error => {
              console.log(error);
          });
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
          .then(response => {
              setUsers(response.data.filter(user => user.email !== 'admin@uc.cl'));
          })
          .catch(error => {
              console.log(error);
          });
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews`)
          .then(response => {
              setReviews(response.data);
          })
          .catch(error => {
              console.log(error);
          });
  }

    
    
    function eliminar_user(id_user) {
        // Realizar la solicitud para obtener la lista de grupos que contienen al usuario
        console.log("eliminando inicial:", id_user)
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/groups`)
          .then((response) => {
            const groups = response.data.filter(group => 
                group.listUsers.includes(id_user));
            groups.forEach((group) => {
              // Filtrar la lista de usuarios para quitar el usuario eliminado
              const lista_actualizada = group.listUsers.filter(id => id !== parseInt(id_user, 10));
                console.log(lista_actualizada)
                axios.put(`${import.meta.env.VITE_BACKEND_URL}/groups/${group.id}`, {
                listUsers: lista_actualizada,
                })
                .then((putResponse) => {
                  console.log(`Lista de usuarios actualizada en el grupo ${group.id}:`, putResponse.data);
                })
                .catch((putError) => {
                  console.error(`Error al actualizar la lista de usuarios en el grupo ${group.id}:`, putError);
                });
            });
            eliminar_usuario_final(id_user);
          })
          .catch((error) => {
            console.error('Hubo un error al obtener la lista de grupos del usuario:', error);
          });
      }
      
      function eliminar_review(id_review) {
        console.log("Review eliminanda:", id_review)
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/reviews/${id_review}`)
          .then((response) => {
            console.log('Review eliminada correctamente:', response.data);
          })
          .catch((error) => {
            console.error('Hubo un error al eliminar la Review:', error);
          });
        actualizarUsuariosYGrupos();
      }

      // Función para eliminar el usuario después de actualizar los grupos
      function eliminar_usuario_final(id_user) {
        console.log("eliminando final:", id_user)
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${id_user}`)
          .then((response) => {
            console.log('Usuario eliminado correctamente:', response.data);
          })
          .catch((error) => {
            console.error('Hubo un error al eliminar el usuario:', error);
          });
        actualizarUsuariosYGrupos();
      }

      function eliminar_grupo(id_grupo) {
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
          actualizarUsuariosYGrupos();
      }
      
      

      return (
        <div className="home-page">
          <main className="home-main">
            <h1>{msg}</h1>
            <h1>Grupos</h1>
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
                    <td><button className="salir-button" onClick={() => eliminar_grupo(group.id)}>
                        Eliminar Grupo
                      </button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h1>Usuarios</h1>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Carrera</th>
                  <th>Likes</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.career}</td> {/* Asegúrate de que 'asignature' es el campo correcto */}
                    <td>{user.likes}</td> {/* Asegúrate de que 'place' es el campo correcto */}
                    <td><button className="salir-button" onClick={() => eliminar_user(user.id)}>
                        Eliminar User
                      </button></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h1>Reviews</h1>
            <table>
              <thead>
                <tr>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td>{review.content}</td> {/* Asegúrate de que 'asignature' es el campo correcto */}
                    <td><button className="salir-button" onClick={() => eliminar_review(review.id)}>
                        Eliminar Review
                      </button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
      );
}

export default AdminCheck;