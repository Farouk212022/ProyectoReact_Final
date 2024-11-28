import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validateUserLogin from "../../services/Firebase/User/firebaseUserValidation.js";
import TasksDatabaseManagement from "../../services/Firebase/Tasks/firebaseTaskDatabaseManagement.js";
import LoginPresentation from "./loginPresentation.js";
import Swal from "sweetalert2";
import "./login.css";

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  const dataForPresentation = {
    isLoading,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
  return <LoginPresentation data={dataForPresentation} />;
};
export default LoginContainer;
