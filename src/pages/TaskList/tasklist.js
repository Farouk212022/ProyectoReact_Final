import React from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../../components/TaskCard/taskCard";
import useTasks from "../../hooks/useTasks";
import "./tasklist.css";
import AddButton from "../../components/AddButton/addButton";

export default function TaskList({ userEmail }) {
  useTasks();
  const { tasks, loading } = useTasks();
  const navigate = useNavigate();
  console.log("Tareas en TaskList:", tasks);

  const handleEdit = (taskId) => {
    console.log("Editar tarea:", taskId);
  };

  const handleDelete = (taskId) => {
    console.log("Eliminar tarea:", taskId);
  };

  const handleAddTask = () => {
    navigate("/addtask");
  };

  return (
    <div className="task-dashboard">
      <h1 className="title-list">Listado de Tareas</h1>
      <div className="task-list">
        {loading ? (
          <p className="loading-text">
            Cargando tareas...
          </p>
        ) : tasks.length === 0 ? (
          <p className="loading-text">
            No hay tareas en este momento.
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              title={task.titulo}
              status={task.terminado}
              detail={task.descripcion}
              onEdit={() => handleEdit(task.id)}
              onDelete={() => handleDelete(task.id)}
            />
            
          ))
        )}
        <AddButton  onClick={handleAddTask} />
      </div>
    </div>
  );
}
