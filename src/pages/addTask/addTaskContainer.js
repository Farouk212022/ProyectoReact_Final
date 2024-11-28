import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTaskPresentation from "./addTaskPresentation";
import useTasks from "../../hooks/useTasks";
import Swal from "sweetalert2";
import "./addTask.css";

const AddTaskContainer = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const { addTask, loading } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && detail) {
      const newTask = { titulo: title, descripcion: detail, terminado: false };
      try {
        await addTask(newTask);
        Swal.fire({
          title: "Tarea Añadida",
          text: "La tarea ha sido añadida exitosamente.",
          icon: "success",
          confirmButtonColor: "#239100",
        });
        navigate("/tasks");
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al añadir la tarea. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonColor: "#239100",
        });
      }
    } else {
      Swal.fire({
        title: "Campos Vacíos",
        text: "Por favor, completa todos los campos antes de enviar.",
        icon: "warning",
        confirmButtonColor: "#239100",
      });
    }
  };

  const handleBack = () => {
    navigate("/tasks");
  };

  const dataForPresentation = {
    title,
    setTitle,
    detail,
    setDetail,
    handleSubmit,
    handleBack,
    loading,
  };
  return <AddTaskPresentation data={dataForPresentation} />;
};

export default AddTaskContainer;
