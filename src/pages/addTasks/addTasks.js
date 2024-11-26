import React, { useState } from "react";
import useTasks from "../../hooks/useTasks";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const { addTask, loading } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && detail) {
      const newTask = { titulo: title, descripcion: detail, terminado: false };
      addTask(newTask);
      navigate("/tasks"); 
    }
  };

  return (
    <div>
      <h1>Agregar Tarea</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Detalle</label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Añadir Tarea"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;