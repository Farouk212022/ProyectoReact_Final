import React from "react";
import { MdOutlineTaskAlt } from "react-icons/md";
import "./register.css";

function RegisterPresentation({ data }) {
  return (
    <div className="register-body">
      {data.isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Cargando...</p>
        </div>
      )}
      <h1>Bienvenido/a!</h1>
      <div
        className="register-form"
        style={{ opacity: data.isLoading ? 0.5 : 1 }}
      >
        <MdOutlineTaskAlt
          className="login-logo"
          size={80}
          color="rgb(35,145,0)"
        />
        <input
          type="text"
          placeholder="Usuario"
          value={data.username}
          onChange={(e) => data.setUsername(e.target.value)}
          className="register-input"
          disabled={data.isLoading}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={data.email}
          onChange={(e) => data.setEmail(e.target.value)}
          className="register-input"
          disabled={data.isLoading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={data.password}
          onChange={(e) => data.setPassword(e.target.value)}
          className="register-input"
          disabled={data.isLoading}
        />
        <button
          onClick={data.handleRegister}
          className="register-button"
          disabled={data.isLoading}
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
export default RegisterPresentation;
