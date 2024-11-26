import { CiBookmarkPlus } from "react-icons/ci";
import "./addButton.css";
export default function AddButton({ onClick }) {
  return (
    <button className="add-button" onClick={onClick}>
      <CiBookmarkPlus size={80} color="rgb(255,255,255)" />
      <p className="add-text">Agregar tarea</p>
    </button>
  );
}