import React from "react";
import { MdOutlineTaskAlt } from "react-icons/md";
import "./editTask.css";

function EditTaskPresentation({ data }) {
  return (
    <div className="addtask-body">
      {data.loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Cargando...</p>
        </div>
      )}
      <h1>Editar Tarea</h1>
      <div
        className="addtask-content"
        style={{ opacity: data.loading ? 0.5 : 1 }}
      >
        <MdOutlineTaskAlt
          className="addtask-logo"
          size={80}
          color="rgb(35,145,0)"
        />
        <form onSubmit={data.handleSubmit} className="addtask-form">
          <div className="form-field">
            <label>Título</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => data.setTitle(e.target.value)}
              required
              disabled={data.loading}
              className="addtask-input"
            />
          </div>
          <div className="form-field">
            <label>Detalle</label>
            <textarea
              value={data.detail}
              onChange={(e) => data.setDetail(e.target.value)}
              required
              disabled={data.loading}
              className="addtask-detail"
            />
          </div>
          <button
            type="submit"
            disabled={data.loading}
            className="addtask-button"
          >
            {data.loading ? "Cargando..." : "Guardar Cambios"}
          </button>
        </form>
        <button
          type="button"
          onClick={data.handleBack}
          className="back-button"
          disabled={data.loading}
        >
          Volver
        </button>
      </div>
    </div>
  );
}

export default EditTaskPresentation;
