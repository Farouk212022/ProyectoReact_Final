import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineTaskAlt } from "react-icons/md";
import TasksDatabaseManagement from "../../services/Firebase/Tasks/firebaseTaskDatabaseManagement"; // Firebase
import { useDispatchContext } from "../../context/taskCtx";
import "./editTasks.css";

const EditTask = () => {
  const { id } = useParams(); // Obtener el ID de la tarea desde la URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatchContext();

  // Cargar los datos de la tarea al inicio
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const taskManagement = new TasksDatabaseManagement();
        const task = await taskManagement.getTask(id); // Obtener la tarea específica
        setTitle(task.titulo);
        setDetail(task.descripcion);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `Hubo un error al cargar los datos de la tarea: ${error.message}`, // Mostrar el error
          icon: "error",
          confirmButtonColor: "#239100",
        });
        console.error("Error al cargar la tarea:", error); // Verificar el error
        navigate("/tasks"); // Redirigir al listado de tareas si hay error
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  // Función para manejar la actualización de la tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && detail) {
      const updatedTask = {
        titulo: title,
        descripcion: detail,
        terminado: false, // O el valor actual del estado de la tarea
      };
      setLoading(true);
      try {
        const taskManagement = new TasksDatabaseManagement();
        await taskManagement.updateTask(id, updatedTask); // Actualizar tarea en Firebase

        // Actualizamos el estado global
        dispatch({
          type: "UPDATE_TASK",
          payload: {
            id,
            updatedTask,
          },
        });

        Swal.fire({
          title: "Tarea Actualizada",
          text: "La tarea ha sido actualizada exitosamente.",
          icon: "success",
          confirmButtonColor: "#239100",
        });
        navigate("/tasks"); // Redirigir al listado de tareas
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al actualizar la tarea: ${error.message}`, // Detallar el error
          icon: "error",
          confirmButtonColor: "#239100",
        });
        console.error("Error al actualizar la tarea:", error); // Verificar error en la consola
      } finally {
        setLoading(false);
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
    navigate("/tasks"); // Volver al listado de tareas
  };

  return (
    <div className="addtask-body">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Cargando...</p>
        </div>
      )}
      <h1>Editar Tarea</h1>
      <div className="addtask-content" style={{ opacity: loading ? 0.5 : 1 }}>
        <MdOutlineTaskAlt
          className="addtask-logo"
          size={80}
          color="rgb(35,145,0)"
        />
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
            {loading ? "Cargando..." : "Guardar Cambios"}
          </button>
        </form>
        <button
          type="button"
          onClick={handleBack}
          className="back-button"
          disabled={loading}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default EditTask;
