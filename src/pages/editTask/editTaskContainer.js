import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TasksDatabaseManagement from "../../services/Firebase/Tasks/firebaseTaskDatabaseManagement";
import { useDispatchContext } from "../../context/taskCtx";
import EditTaskPresentation from "./editTaskPresentation";
import Swal from "sweetalert2";
import "./editTask.css";

const EditTaskContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatchContext();

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const taskManagement = new TasksDatabaseManagement();
        const task = await taskManagement.getTask(id);
        setTitle(task.titulo);
        setDetail(task.descripcion);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `Hubo un error al cargar los datos de la tarea: ${error.message}`,
          icon: "error",
          confirmButtonColor: "#239100",
        });
        console.error("Error al cargar la tarea:", error);
        navigate("/tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && detail) {
      const updatedTask = {
        titulo: title,
        descripcion: detail,
        terminado: false,
      };
      setLoading(true);
      try {
        const taskManagement = new TasksDatabaseManagement();
        await taskManagement.updateTask(id, updatedTask);
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
        navigate("/tasks");
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `Hubo un problema al actualizar la tarea: ${error.message}`,
          icon: "error",
          confirmButtonColor: "#239100",
        });
        console.error("Error al actualizar la tarea:", error);
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
  return <EditTaskPresentation data={dataForPresentation} />;
};

export default EditTaskContainer;
