import React, {useContext, useState} from 'react'; 
import './styles/LogInPage.css';
import {AuthContext} from '/src/auth/AuthContext';

const LogoutButton = () => { 
    const {logout} = useContext(AuthContext); 
    const [msg, setMsg] = useState("¿Estás seguro de que quieres cerrar sesión?");

    const handleLogout = () => {
        logout();
        setMsg("Has hecho logout con éxito!");
        navigateTo('/landing_page')
}

return  (
    <>
        {msg.length > 0 && <div className="successMsg"> {msg} </div>}
        <button onClick={handleLogout}>
            Cerrar sesión
        </button>
    </>
);
}

export default LogoutButton;

function navigateTo(path) {
    window.location.href = path;
  }