import React, { useEffect, useState, useContext } from 'react';
import '../styles/GroupsView.css';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function VerReviews() {

  const navigate = useNavigate();
  const [reviews, setReviews] = useState([])
  const { token } = useContext(AuthContext);
  const decodedToken = jwtDecode(token);
  const userId = parseInt(decodedToken.sub, 10); // Obtienes el userId del token decodificado
  const [groupIds, setRequest] = useState([])


  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/reviews`)
        .then((response) => {
          const userReviews = response.data.filter(review => 
            parseInt(review.userId, 10) === userId
          );
          setReviews(userReviews);
          //console.log(userGroups)
        })

        .catch((error) => {
          console.log(error);
        });
    }, 2000); // Actualiza cada 2 segundos, por ejemplo.
    return () => clearInterval(intervalId);
  }, [userId]);


  return (
    <main className="groupsview-main">
      <div className="groupsview">
        <h1>Tus reviews:</h1>
        <table>
          <thead>
            <tr>
              <th>Like</th>
              <th>Contenido</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(reviews).length > 0 ? (
              Object.values(reviews).map(review => (
                <tr key={review.id}>
                  <td>{review.like ? 'Like' : 'Dislike'}</td>
                  <td>{review.content}</td>
                </tr>
              ))
            ) : (
              // Puedes renderizar algo mientras los grupos están siendo cargados
              <tr>
                <td colSpan="6">Buscando reviews...</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="button-container">
              <button onClick={() => navigateTo('/mis_datos')}>Volver</button>
            </div>
      </div>
    </main>
  );
  


function navigateTo(path) {
  window.location.href = path;
}
}
export default VerReviews;