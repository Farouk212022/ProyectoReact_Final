import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatchContext } from "../../context/taskCtx";
import useTasks from "../../hooks/useTasks";
import TaskListPresentation from "./taskListPresentation";
import "./taskList.css";

export default function TaskListContainer() {
  useTasks();
  const { tasks, loading, deleteTask } = useTasks();
  const navigate = useNavigate();
  const dispatch = useDispatchContext();

  console.log("Tareas en TaskList:", tasks);

  const handleEdit = (taskId) => {
    console.log("Editar tarea:", taskId);
    navigate(`/edit/${taskId}`);
  };

  const handleDelete = (taskId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la tarea de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(taskId);
        Swal.fire({
          title: "Tarea eliminada",
          text: "La tarea ha sido eliminada correctamente",
          icon: "success",
          confirmButtonColor: "#239100",
        });
      }
    });
  };

  const handleStatusChange = (taskId) => {
    Swal.fire({
      title: "Confirmación",
      text: "¿Desea confirmar que se ha completado la tarea? Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#239100",
      cancelButtonColor: "",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "TOGGLE_TASK_STATUS", payload: taskId });
        Swal.fire({
          title: "Estado de la tarea cambiado",
          text: "La tarea se ha completado",
          icon: "success",
          confirmButtonColor: "#239100",
        });
      }
    });
  };

  const handleAddTask = () => {
    navigate("/addtask");
  };
  const dataForPresentation = {
    loading,
    tasks,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleAddTask,
  };
  return <TaskListPresentation data={dataForPresentation} />;
}
