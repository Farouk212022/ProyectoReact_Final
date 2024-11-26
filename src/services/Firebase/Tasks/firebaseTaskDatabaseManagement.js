import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";

class TasksDatabaseManagement { 
  async traerTareas() {
    try {
      console.log(`usuarios/${localStorage.getItem("userId")}`)
      const databaseSearch = query(
        collection(db, "tareas"),
        where("usuario", "==", localStorage.getItem("userId"))
      );
      const resultado = await getDocs(databaseSearch);
      const tareas = resultado.docs.map(doc => ({
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
}
export default TasksDatabaseManagement;