import {db} from "../firebaseConfig";
import {collection, addDoc} from "firebase/firestore";

async function registerUser(username, email, password) {
    try {
        const docRef = await addDoc(collection(db, "usuarios"),{
            username,
            email,
            password,
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