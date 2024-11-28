import React from "react";
import TaskCard from "../../components/TaskCard/taskCard";
import AddButton from "../../components/AddButton/addButton";
import "./taskList.css";

function TaskListPresentation({ data }) {
  return (
    <div className="task-dashboard">
      <h1 className="title-list">Listado de Tareas</h1>
      <div className="task-list">
        {data.loading ? (
          <p className="loading-text">Cargando tareas...</p>
        ) : data.tasks.length === 0 ? (
          <p className="loading-text">No hay tareas en este momento.</p>
        ) : (
          data.tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.titulo}
              status={task.terminado}
              detail={task.descripcion}
              id={task.id}
              onEdit={() => data.handleEdit(task.id)}
              onDelete={() => data.handleDelete(task.id)}
              onStatusChange={() => data.handleStatusChange(task.id)}
            />
          ))
        )}
        <AddButton onClick={data.handleAddTask} />
      </div>
    </div>
  );
}
export default TaskListPresentation;
