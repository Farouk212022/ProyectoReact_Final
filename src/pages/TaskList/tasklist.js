import React from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../../components/TaskCard/taskCard";
import useTasks from "../../hooks/useTasks";
import "./tasklist.css"

export default function TaskList({ userEmail }) {
  useTasks();
  const {tasks, loading } = useTasks();
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
    <div className="task-list-container">
      <h1>Listado de Tareas</h1>
      <button onClick={handleAddTask} className="add-task-button">Añadir Tarea</button>
      {loading ? (
        <p class name="loading-text">Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p className="no-tasks">No hay tareas en este momento.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            title={task.titulo}
            detail={task.descripcion}
            status = {task.terminado}
            onEdit={() => handleEdit(task.id)}
            onDelete={() => handleDelete(task.id)}
          />
        ))
      )}
      </div>
    
  );
}