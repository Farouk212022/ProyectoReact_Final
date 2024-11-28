import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerUser from "../../services/Firebase/User/firebaseUserCreation";
import Swal from "sweetalert2";
import RegisterPresentation from "./registerPresentation";
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
  const dataForPresentation = {username,email,password,isLoading,handleRegister,setUsername,setEmail,setPassword} ;
  return <RegisterPresentation data={dataForPresentation} />;
}
