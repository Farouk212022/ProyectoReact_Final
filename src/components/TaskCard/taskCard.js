import React from "react";
import "./taskCard.css"; 
export default function TaskCard({ title, detail, onEdit, onDelete }) {
  return (
    <div className="task-item">
      <span className="task-title">{title}</span>
      <span className="task-detail">{detail}</span>
      <div className="task-buttons">
        <button className="task-edit-button" onClick={onEdit}>
          Editar
        </button>
        <button className="task-delete-button" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}