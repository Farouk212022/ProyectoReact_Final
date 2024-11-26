import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineTaskAlt  } from "react-icons/md";
import "./login.css";
import validateUserLogin from "../../services/Firebase/User/firebaseUserValidation.js";
import TasksDatabaseManagement from "../../services/Firebase/Tasks/firebaseTaskDatabaseManagement.js";

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
        confirmButtonColor: "#239100",
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
        confirmButtonColor: "#239100",
      });
      setIsLoading(false);
      if (validacion.existe) {
        const prueba = new TasksDatabaseManagement();
        prueba.traerTareas();
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
      <h1>Inicio de Sesión </h1>
      <div className="login-content" style={{ opacity: isLoading ? 0.5 : 1 }}>
        <MdOutlineTaskAlt  className="login-logo" size={80} color="rgb(35,145,0)" />
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
    </div>
  );
};
export default LoginPage;
