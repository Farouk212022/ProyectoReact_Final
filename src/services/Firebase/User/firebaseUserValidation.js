import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../firebaseConfig";import { signInWithEmailAndPassword } from "firebase/auth";

async function validateUserLogin(email, password) {
    try {
      const loginValidation = await signInWithEmailAndPassword(auth, email, password);
      if (!loginValidation.isEmpty){
      const databaseSearch = query(
        collection(db, "usuarios"), 
        where("email", "==", email),
      );
      const resultado = await getDocs(databaseSearch);
        const username = resultado.docs[0].data().username;
        return {
          existe: true,
          titulo: "Ingreso Exitoso",
          mensaje: `Bienvenido al Tablero de Tareas ${username}`,
          icon: "success",
        };} else {
          return {
            existe: false,
            titulo: "Error",
            mensaje: "Usuario no encontrado",
            icon: "error",
          };
        }
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
