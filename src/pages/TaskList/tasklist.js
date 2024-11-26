import React, { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard/taskCard";
import useTasks from "../../hooks/useTasks";
import "./tasklist.css";

export default function TaskList({ userEmail }) {
  useTasks();
  const {tasks, loading } = useTasks();
  console.log("Tareas en TaskList:", tasks);

  const handleEdit = (taskId) => {
    console.log("Editar tarea:", taskId);
  };

  const handleDelete = (taskId) => {
    console.log("Eliminar tarea:", taskId);
  };

  return (
    <div className="task-dashboard">
      <h1 className="title-list">Listado de Tareas</h1>
      <div className="task-list">
      {loading ? (
        <p class name="loading-text">Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p class name="loading-text">No hay tareas en este momento.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            title={task.titulo}
            detail={task.descripcion}
            onEdit={() => handleEdit(task.id)}
            onDelete={() => handleDelete(task.id)}
          />
        ))
      )}
      </div>
    </div>
  );
}