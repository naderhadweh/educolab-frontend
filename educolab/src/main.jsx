import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './common/Navbar.jsx';
import './styles/LandingPage.css';
import Routing from './common/Routing.jsx';
import Footer from './common/Footer.jsx';
import AuthProvider from './auth/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Navbar />
      <AuthProvider>
        <Routing/>
      </AuthProvider>
        <Footer/>
    </React.StrictMode>,
)