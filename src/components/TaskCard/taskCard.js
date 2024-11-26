import React from "react";
import "./taskCard.css";

const TaskCard = ({ title, detail, status, onEdit, onDelete }) => {
  return (
    <div className="task-card">
      <div className="task-info">
        <span className="task-title">{title}</span>
        <span className="task-detail">{detail}</span>
        <span
          className={`task-status ${
            status ? "completed" : "pending"
          }`}
        >
          {status ? "Completado" : "Pendiente"}
        </span>
      </div>
      <div className="task-actions">
        <button className="edit-button" onClick={onEdit}>
          Editar
        </button>
        <button className="delete-button" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
