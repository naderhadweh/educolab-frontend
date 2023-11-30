import React, { useState, useEffect, useContext } from 'react';
import './styles/LogInPage.css';
import axios from 'axios';
import {AuthContext} from './auth/AuthContext';

function LogInPage() {
  
  const {token, setToken} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');

  // Función para manejar el inicio de sesión simulado
  const handleLogin = async (event) => {
    event.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      console.log("apretaste el form")
      //vamos a enviar un post a la ruta login
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,
      {
        email,
        password
      }).then((response) => {
        //uno entra acá si no hay error en el request
        console.log("bloque then")
        //dar un msje de exito
        setError(false);
        setMsg("Logueaste Correctamente")
        console.log(response.data)
        const access_token = response.data.access_token;
        setToken(access_token);
        const { user_data } = response.data; // Suponiendo que también recibes datos del usuario
        navigateTo('/home_page'); //esto nose si esta bien
      }).catch((error) => {
        console.log("bloque catch")
        setError(true);
        setMsg("Este usuario no existe")
        console.log(error)
      })
    } else {
      alert('Debes ingresar un nombre de usuario y contraseña');
    }
  };

  return (
    <div className="landing-page" >
      <main className="landing-main">
        {/* Simulador de inicio de sesión */}
        <section className="login-box">
          <h2>Iniciar Sesión</h2>

          {/* Mensajes de error y éxito */}
          {error && <div className="error-message">{msg}</div>}
          {!error && msg && <div className="success-message">{msg}</div>}
          
          <div className="login-form">
            <div className="form-group"> 
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Constraseña"
              />
            </div>
            <button className="button" onClick={handleLogin}>
              Iniciar Sesión
            </button>
            <div class="line"></div>
            <button className="bts" onClick={() => navigateTo('/signup')}>
              Crear cuenta nueva
            </button>
          </div>
        </section>
      </main>

    </div>
  );
}

function navigateTo(path) {
  window.location.href = path;
}

export default LogInPage;