import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

class TasksDatabaseManagement { 
  async crearTarea(task) {
    try {
      await addDoc(collection(db, "tareas"), task);
      return {
        success: true,
        titulo: "Tarea creada",
        mensaje: "La tarea se ha creado correctamente.",
        icon: "success",
      };
    } catch (error) {
      return {
        success: false,
        titulo: "Error",
        mensaje: "Hubo un problema al crear la tarea. Intenta nuevamente.",
        icon: "error",
      };
    }
  }
}
export default TasksDatabaseManagement;