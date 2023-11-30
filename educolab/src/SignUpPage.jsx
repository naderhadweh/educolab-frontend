import React, { useState, useEffect, useContext } from 'react';
import './styles/SignUpPage.css';
import axios from 'axios';
import {AuthContext} from './auth/AuthContext';

function SignUpPage() {
  const {token, setToken} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [phone, setPhone] = useState('');
  const [career, setCareer] = useState('');
  const [likes] = useState(0); // Si `likes` nunca cambia, puedes usar simplemente una constante.
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        name,
        career,
        phone,
        password,
        email,
        likes,
        photo
      });
      setMsg(response.data.message);
      const access_token = response.data.access_token;
      setToken(access_token);
      navigateTo('/home_page');
    } catch (error) {
        console.log("bloque catch")
        setError(true);
        setMsg("Hubo un error al registrar tus datos")
        console.log(error)
    }
  };

  return (
    <div className="sign-up-page">
      <h1>Sign Up</h1>
      {error && <div className="error-message">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Nombre Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          name="photo"
          placeholder="Foto URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <input
          type="text"
          name="phone"
          placeholder="Celular"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          name="career"
          placeholder="Carrera"
          value={career}
          onChange={(e) => setCareer(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

function navigateTo(path) {
  window.location.href = path;
}

export default SignUpPage;