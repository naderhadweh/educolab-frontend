import React, { useState } from 'react';
import './styles/LandingPage.css';
import gente1 from '/gente1.jpg'; // Ajuste la ruta según sea necesario

function LandingPage() {
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const text = 'Descubre el potencial de trabajar en grupo';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el inicio de sesión simulado
  const handleLogin = () => {
    if (username.trim() !== '' && password.trim() !== '') {
      navigateTo('/home_page');
    } else {
      alert('Debes ingresar un nombre de usuario y contraseña');
    }
  };

  return (
    <div className="landing-page">
    <main className="landing-main">
      <section id="hero" style={{backgroundImage: `url(${gente1})`}} className="landing-hero">
        <div className="hero-content">
          <h1
            className={`hero-title ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Descubre el potencial de trabajar en grupo
          </h1>
        </div>
      </section>
      <section className="call-to-action">
        <h2>Crea y únete a grupos de estudio con tus compañeros de universidad. Chatea, organiza reuniones y aprende con Educolab.</h2> 
        <div className="button">
          <button onClick={() => navigateTo('/login')}>Inicia sesión</button>
        </div>
      </section>
    </main>
    <footer>
      {/* Información del pie de página como derechos de autor, enlaces, etc. */}
    </footer>
  </div>
  );
}

function navigateTo(path) {
  window.location.href = path;
}

export default LandingPage;
