import React, { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard/taskCard";
import useTasks from "../../hooks/useTasks";

export default function TaskList({ userEmail }) {
  useTasks();
  const {tasks, loading } = useTasks();

  const handleEdit = (taskId) => {
    console.log("Editar tarea:", taskId);
  };

  const handleDelete = (taskId) => {
    console.log("Eliminar tarea:", taskId);
  };

  return (
    <div className="task-list">
      <h1>Listado de Tareas</h1>
      {loading ? (
        <p>Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p>No hay tareas en este momento.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            detail={task.detail}
            onEdit={() => handleEdit(task.id)}
            onDelete={() => handleDelete(task.id)}
          />
        ))
      )}
    </div>
  );
}