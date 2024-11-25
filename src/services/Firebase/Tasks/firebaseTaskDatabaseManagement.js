import { db } from "../firebaseConfig";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

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
     
    } catch (error) {
      console.log(error);
    }
  }
}
export default TasksDatabaseManagement;