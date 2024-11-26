import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

class TasksDatabaseManagement {
  async traerTareas() {
    try {
      console.log(`usuarios/${localStorage.getItem("userId")}`);
      const databaseSearch = query(
        collection(db, "tareas"),
        where("usuario", "==", localStorage.getItem("userId"))
      );
      const resultado = await getDocs(databaseSearch);
      const tareas = resultado.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Tareas encontradas:", tareas);

      return tareas;
    } catch (error) {
      console.log(error);
    }
  }

  async addTarea(task) {
    try {
      const docRef = await addDoc(collection(db, "tareas"), {
        ...task,
        usuario: localStorage.getItem("userId"),
      });
      console.log("Tarea añadida con ID: ", docRef.id);
    } catch (error) {
      console.log("Error al agregar la tarea:", error);
      throw error;
    }
  }

  async deleteTarea(taskId) {
    const taskRef = doc(db, "tareas", taskId);
    await deleteDoc(taskRef);
  }

  async updateTaskStatus(taskId, status) {
    try {
      const taskRef = doc(db, "tareas", taskId);
      await updateDoc(taskRef, {
        terminado: status,
      });
      console.log(`Tarea con ID ${taskId} actualizada a estado: ${status}`);
    } catch (error) {
      console.log("Error al actualizar la tarea en Firebase:", error);
    }
  }

  async getTask(id) {
    try {
      const taskRef = doc(db, "tareas", id); // Buscar la tarea por su ID
      const taskDoc = await getDoc(taskRef); // Obtener el documento de la tarea

      if (taskDoc.exists()) {
        return { id: taskDoc.id, ...taskDoc.data() }; // Devuelve los datos de la tarea
      } else {
        throw new Error("Tarea no encontrada"); // Si no existe la tarea
      }
    } catch (error) {
      console.error("Error al obtener la tarea:", error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  async updateTask(taskId, updatedData) {
    try {
      const taskRef = doc(db, "tareas", taskId);
      await updateDoc(taskRef, updatedData); // Actualizar los datos de la tarea
      console.log(`Tarea con ID ${taskId} actualizada`);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      throw error;
    }
  }
}
export default TasksDatabaseManagement;
