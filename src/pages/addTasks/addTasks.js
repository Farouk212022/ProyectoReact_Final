import React, { useState } from "react";
import useTasks from "../../hooks/useTasks";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineTaskAlt } from "react-icons/md";
import "./addTasks.css";

const AddTask = () => {
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
  }

  return (
    <div className="addtask-body">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Cargando...</p>
        </div>
      )}
      <h1>Agregar Tarea</h1>
      <div className="addtask-content" style={{ opacity: loading ? 0.5 : 1 }}>
        <MdOutlineTaskAlt className="addtask-logo" size={80} color="rgb(35,145,0)" />
        <form onSubmit={handleSubmit} className="addtask-form">
          <div className="form-field">
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
              className="addtask-input"
            />
          </div>
          <div className="form-field">
            <label>Detalle</label>
            <input
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
              disabled={loading}
              className="addtask-detail"
            />
          </div>
          <button type="submit" disabled={loading} className="addtask-button">
            {loading ? "Cargando..." : "Añadir Tarea"}
          </button>
        </form>
        <button
          type="button"
          onClick={handleBack}
          className="back-button"
          disabled={loading}
        >Volver</button>
      </div>
    </div>
  );
};

export default AddTask;
