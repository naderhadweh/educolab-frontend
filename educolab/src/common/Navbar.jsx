import React from 'react';
import '../styles/Navbar.css';
import logo from '/logo.png';

function Navbar() {
  return (
    <div className="home-page">
      <main >

        {/* Sección de héroe */}
        <section >
          <div className="hero-content">
            {/* Título de bienvenida */}
            <div className="hero-left">
              <h1 onClick={() => navigateTo('/')}> EDUCOLAB </h1>
              <img onClick={() => navigateTo('/')} src={logo} alt="Logo de EDUCOLAB" className="logo" /> 
            </div>
 
            {/* Botones de acción */}
            <div className="hero-right">
              <button className='boton-navbar' onClick={() => navigateTo('/instructions_page')}>Instrucciones</button>
              <button className='boton-navbar' onClick={() => navigateTo('/home_page')}>Inicio</button>
              <button className='boton-navbar' onClick={() => navigateTo('/user_check')}>Verificar user</button>
              <button className='boton-navbar' onClick={() => navigateTo('/admin_check')}>Verificar admin</button>
              <button className='boton-navbar' onClick={() => navigateTo('/logout')}>LogOut</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function navigateTo(path) {
  window.location.href = path;
}

export default Navbar;