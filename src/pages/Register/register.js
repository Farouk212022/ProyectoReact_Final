import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import registerUser from "../../services/Firebase/User/firebaseUserCreation"
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un email válido",
        icon: "error",
      });
      return;
    }

    if (username !== "" && email !== "" && password !== "") {
      setIsLoading(true);
      try {
        const response = await registerUser(username, email, password);
        Swal.fire({
          title: response.titulo,
          text: response.mensaje,
          icon: response.icon,
        });

        if (response.success) {
          navigate("/login");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al conectarse con el servidor",
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos",
        icon: "error",
      });
    }
  };

  return (
    <div className="register-body">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Cargando...</p>
        </div>
      )}
      <header className="register-header">
        <img src="nextPlayerLogo.png" className="register-logo" alt="Logo" />
        <a
          href="mailto:proyectofinalreactjs@gmail.com"
          className="register-contact-link"
        >
          Contact
        </a>
      </header>
      <h1>Bienvenido/a!</h1>
      <div className="register-form" style={{ opacity: isLoading ? 0.5 : 1 }}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
          disabled={isLoading}
        />
        <button
          onClick={handleRegister}
          className="register-button"
          disabled={isLoading}
        >
          Registrarse
        </button>
        <a href="/login" className="register-login-link">
          ¿Ya tienes cuenta? Inicia sesión aquí
        </a>
      </div>
      <footer className="register-footer">
        <p>&copy; 2024 - Página increíble</p>
      </footer>
    </div>
  );
}

