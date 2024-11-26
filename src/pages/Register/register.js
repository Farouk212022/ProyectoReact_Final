import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineTaskAlt  } from "react-icons/md";
import registerUser from "../../services/Firebase/User/firebaseUserCreation";
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
          confirmButtonColor: "#239100",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos",
        icon: "error",
        confirmButtonColor: "#239100",
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
      <h1>Bienvenido/a!</h1>
      <div className="register-form" style={{ opacity: isLoading ? 0.5 : 1 }}>
      <MdOutlineTaskAlt  className="login-logo" size={80} color="rgb(35,145,0)" />
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
        
      </div>
      <a href="/login" className="register-login-link">
          ¿Ya tienes cuenta? Inicia sesión aquí
        </a>
    </div>
  );
}
