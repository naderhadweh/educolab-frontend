import '../styles/Chat.css';
import { useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import {jwtDecode} from 'jwt-decode'; // Importación corregida
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ChatComponent() {
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const location = useLocation();
  const { id_grupo, tipo, nombre } = location.state || {};
  const [contenido, setContent] = useState([]);

  useEffect(() => {
    // Función para realizar la solicitud al backend
    const fetchChat = () => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/chats`)
        .then(response => {
          console.log('Respuesta del servidor:', response.data);

          // Filtrar los chats para encontrar el que coincida con id_grupo y tipo
          const chat_elegido = response.data.find(chat => chat.groupId === id_grupo && chat.type === tipo);

          if (chat_elegido) {
            console.log('Chat elegido:', chat_elegido);
            setContent(chat_elegido.content || []); // Usar contenido si está definido, o un array vacío si no lo está
            setChat(chat_elegido);
          } else {
            console.error(`No se encontró un chat con groupId ${id_grupo} y type ${tipo}`);
          }
        })
        .catch(error => console.error('Error al obtener el chat:', error));
    };

    // Llamar a la función inicialmente
    fetchChat();

    // Establecer la repetición cada 4 segundos usando setInterval
    const intervalId = setInterval(fetchChat, 4000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [id_grupo, tipo]);
  

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      // Obtener la fecha y hora actual formateada sin segundos
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      // Componer el nuevo mensaje
      const composedMessage = `${formattedDate} ${formattedTime} - ${nombre}: ${newMessage}`;
  
      // Actualizar el estado
      const updatedContent = [...contenido, composedMessage];
      setContent(updatedContent);
      setNewMessage('');
  
      // Enviar el nuevo mensaje al servidor
      axios.put(`${import.meta.env.VITE_BACKEND_URL}/chats/${chat.id}`, {
        content: updatedContent,
      })
        .then((response) => {
          console.log('Grupo actualizado correctamente:', response.data);
        })
        .catch((error) => {
          console.error('Hubo un error al actualizar la lista de usuarios del grupo:', error);
        });
    }
  };
  
  
  
  

  return (
    <div className="chat-container">
      <h1>Chat {tipo}</h1>
      <div className="message-container">
        {contenido.map((message, index) => (
          <div key={index} className="message">{message}</div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default ChatComponent;