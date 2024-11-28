import React from "react";
import { MdOutlineTaskAlt } from "react-icons/md";
import "./login.css";
function loginPresentation({ data }) {
  return (
    <div className="login-body">
      {data.isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Cargando...</p>
        </div>
      )}
      <h1>Inicio de Sesión </h1>
      <div
        className="login-content"
        style={{ opacity: data.isLoading ? 0.5 : 1 }}
      >
        <MdOutlineTaskAlt
          className="login-logo"
          size={80}
          color="rgb(35,145,0)"
        />
        <input
          type="text"
          placeholder="Ingrese email"
          value={data.email}
          onChange={(e) => data.setEmail(e.target.value)}
          className="login-input"
          disabled={data.isLoading}
        />
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={data.password}
          onChange={(e) => data.setPassword(e.target.value)}
          className="login-input"
          disabled={data.isLoading}
        />
        <button
          onClick={data.handleLogin}
          className="login-button"
          disabled={data.isLoading}
        >
          Iniciar sesión
        </button>
      </div>
      <a href="/register" className="login-register-link">
        ¿No tienes cuenta? Regístrate aquí
      </a>
    </div>
  );
}
export default loginPresentation;
