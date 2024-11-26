import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TaskCard from "../../components/TaskCard/taskCard";
import { useDispatchContext } from "../../context/taskCtx"; // Importar el contexto de dispatch
import useTasks from "../../hooks/useTasks";
import "./tasklist.css";
import AddButton from "../../components/AddButton/addButton";


export default function TaskList({ userEmail }) {
  useTasks();
  const { tasks, loading, deleteTask } = useTasks();
  const navigate = useNavigate();
  const dispatch = useDispatchContext();

  console.log("Tareas en TaskList:", tasks);

  const handleEdit = (taskId) => {
    console.log("Editar tarea:", taskId);
    navigate(`/edit/${taskId}`)
  };

  const handleDelete = (taskId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la tarea de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(taskId);
        Swal.fire(
          "Eliminada",
          "La tarea ha sido eliminada con éxito.",
          "success"
        );
      }
    });
  };

  const handleStatusChange = (taskId) => {
    console.log("Cambiando estado de la tarea con ID:", taskId);
    dispatch({ type: "TOGGLE_TASK_STATUS", payload: taskId });
  };

  const handleAddTask = () => {
    navigate("/addtask");
  };

  return (
    <div className="task-dashboard">
      <h1 className="title-list">Listado de Tareas</h1>
      <div className="task-list">
        {loading ? (
          <p className="loading-text">Cargando tareas...</p>
        ) : tasks.length === 0 ? (
          <p className="loading-text">No hay tareas en este momento.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.titulo}
              status={task.terminado}
              detail={task.descripcion}
              id={task.id}
              onEdit={() => handleEdit(task.id)}
              onDelete={() => handleDelete(task.id)}
              onStatusChange={() => handleStatusChange(task.id)}
            />
          ))
        )}
        <AddButton onClick={handleAddTask} />
      </div>
    </div>
  );
}
