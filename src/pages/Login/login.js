import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCircleUser } from "react-icons/fa6";
import "./login.css";
import validateUserLogin from "../../services/Firebase/User/firebaseUserValidation.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un email válido",
        icon: "error",
      });
      return;
    }
    if (email !== "" && password !== "") {
      var validacion = await validateUserLogin(email, password);
      setIsLoading(true);
      Swal.fire({
        title: validacion.titulo,
        text: validacion.mensaje,
        icon: validacion.icon,
      });
      setIsLoading(false);
      if (validacion.existe) {
        navigate("/tasks/");
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
    <div className="login-body">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Cargando...</p>
        </div>
      )}
      <header className="login-header">
        <img src="nextPlayerLogo.png" className="login-logo" alt="Logo" />
        <a
          href="mailto:proyectofinalreactjs@gmail.com"
          className="login-contact-link"
        >
          Contact
        </a>
      </header>
      <div className="login-content" style={{ opacity: isLoading ? 0.5 : 1 }}>
        <FaCircleUser size={60} color="rgb(28, 90, 189)" />
        <input
          type="text"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          disabled={isLoading} // Deshabilitar input mientras carga
        />
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          disabled={isLoading} // Deshabilitar input mientras carga
        />
        <button
          onClick={handleLogin}
          className="login-button"
          disabled={isLoading} // Deshabilitar botón si está cargando
        >
          Iniciar sesión
        </button>
      </div>
      <a href="/register" className="login-register-link">
        ¿No tienes cuenta? Regístrate aquí
      </a>
      <footer className="login-footer">
        <p>&copy; 2024 - Página increíble</p>
      </footer>
    </div>
  );
};
export default LoginPage;
