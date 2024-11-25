import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

async function validateUserLogin(email, password) {
  console.log(email, password);
    try {
      const databaseSearch = query(
        collection(db, "usuarios"), 
        where("email", "==", email),
        where("password", "==", password)
      );
      const resultado = await getDocs(databaseSearch);
      if (resultado.empty) {
        return {
          existe: false,
          titulo: "Error",
          mensaje:
            "Error en las credenciales, por favor verifiquelas e intente nuevamente",
          icon: "error",
        };
      } else {
        const username = resultado.docs[0].data().username;
        return {
          existe: true,
          titulo: "Ingreso Exitoso",
          mensaje: `Bienvenido al Tablero de Tareas ${username}`,
          icon: "success",
        };
      }
    } catch (error) {
      return {
        existe: true,
        titulo: "Error",
        mensaje:
          "Ha ocurrido un error al iniciar sesión, por favor intente nuevamente",
        icon: "error",
      };
    }
  }
export default validateUserLogin;
