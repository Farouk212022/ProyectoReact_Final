import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import "./taskCard.css";

export default function TaskCard({
  title,
  detail,
  status,
  onEdit,
  onDelete,
  onStatusChange,
  id
}) {
  return (
    <div className="task-item">
      <span className="task-title">{title}</span>
      <span className="task-detail">Descripción: {detail}</span>
      <span className={`task-status ${status ? "completed" : "pending"}`}>
        {status ? "Completado" : "Pendiente"}
      </span>
      <div className="task-buttons">
        <button className="edit-button" onClick={onEdit}>
          <CiEdit size={30} color="rgb(255,255,255)" />
        </button>
        <button className="delete-button" onClick={onDelete}>
          <MdDeleteOutline size={30} color="rgb(255,255,255)" />
        </button>
        {!status && (
          <button className="task-complete" onClick={onStatusChange}>
            <FaCheck size={30} color="rgb(255,255,255)" />
          </button>
        )}
      </div>
    </div>
  );
}
