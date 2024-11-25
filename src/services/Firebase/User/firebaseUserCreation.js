import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

async function registerUser(username, email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "usuarios"), {
      username,
      email,
    });
    return {
      success: true,
      titulo: "Registro exitoso",
      mensaje: `Usuario ${username} registrado correctamente.`,
      icon: "success",
    };
  } catch (error) {
    return {
      success: false,
      titulo: "Error",
      mensaje: "Hubo un problema al registrar el usuario. Intenta nuevamente.",
      icon: "error",
    };
  }
}

export default registerUser;
