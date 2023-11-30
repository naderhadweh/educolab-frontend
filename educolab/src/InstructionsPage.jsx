import React, { useState, useEffect } from 'react';
import './styles/InstructionsPage.css';

function InstructionsPage() {
  const images = [
    '/3.jpg',
    '/1.jpg',
    '/2.jpg',
    '/4.jpg', 
    '/5.jpg', 
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3400);

    return () => {
      clearInterval(interval);
    };
  }, [images]); // Asegúrate de incluir 'images' como dependencia para reiniciar el intervalo cuando cambian las imágenes

  return (
    <div className="instructions-page">
      <main className="instructions-main">
        <header className="instructions-header">
          <img src={images[currentImageIndex]} alt="Banner" />
        </header>
        <section id="hero" className="instructions-hero">
          <h1>Instrucciones</h1>
          <div className="text-box">
            <h1>1. Inicio de sesión o Registro</h1>
            <p>- Si ya tienes una cuenta, inicia sesión con tu correo electrónico y contraseña, si no, regístrate en la plataforma proporcionando tus datos personales.</p>
          </div>
          <div className="text-box">
            <h1>2. Explorar grupos de estudio</h1>
            <p>- Una vez que hayas iniciado sesión, dirígete a la página principal donde podrás explorar los grupos de estudio disponibles.</p>
            <p>- Encontrarás una lista de grupos propuestos por otros usuarios, cada uno con detalles como el ramo, contenido, fecha, hora y lugar de estudio.</p>
          </div>
          <div className="text-box">
            <h1>3. Unirse o proponer grupo de estudio</h1>
            <p>- Si encuentras un grupo que te interesa, puedes unirte a él haciendo clic en el botón correspondiente.</p>
            <p>- Asegúrate de verificar la disponibilidad de cupos en el grupo, ya que algunos grupos pueden tener un límite máximo de participantes.</p>
            <p>- También puedes proponer una nueva sesión de estudio en "Crear grupo", indicando los detalles correspondientes.</p>
          </div>
          <div className="text-box">
            <h1>4. Chatear con tus compañeros</h1>
            <p>- Cuando ya tengas un grupo, puedes chatear con tus compañeros de grupo sobre temas relacionados al estudio y también sobre temas offtopic en los botones de la página de inicio.</p>

          </div>
        </section>
      </main>
      
    </div>
  );
}

export default InstructionsPage;
