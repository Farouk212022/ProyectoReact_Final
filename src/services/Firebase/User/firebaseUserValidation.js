import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import TasksDatabaseManagement from "./firebaseTaskDatabaseManagement";

async function validateUserLogin(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const databaseSearch = query(
      collection(db, "usuarios"),
      where("email", "==", email)
    );
    const resultado = await getDocs(databaseSearch);
    localStorage.setItem("userId", resultado.docs[0].ref.id);
    const proof = new TasksDatabaseManagement()
    proof.crearTarea({titulo: "prueba", descripcion: "prueba", estado: "pendiente"})
    const username = resultado.docs[0].data().username;
    return {
      existe: true,
      titulo: "Ingreso Exitoso",
      mensaje: `Bienvenido al Tablero de Tareas ${username}`,
      icon: "success",
    };
  } catch (error) {
    return {
      existe: false,
      titulo: "Error",
      mensaje:
        "Ha ocurrido un error al iniciar sesión, por favor verifique las credenciales e intente nuevamente.",
      icon: "error",
    };
  }
}
export default validateUserLogin;
