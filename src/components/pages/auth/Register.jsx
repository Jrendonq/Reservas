import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { database } from "../../database/firedatabaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const crearUsuarioFirebase = async () => {
    try {
      const auth = getAuth();
      const credencial = await createUserWithEmailAndPassword(auth, user, password);
      await guardarUsuarioFirestore(fullName, user, credencial.user.uid);
      console.log("Usuario registrado en Firebase Authentication:", credencial.user.uid);
      console.log("Usuario registrado en Firestore:", user);
      navigate("/Sesion");
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      Swal.fire({
        title: "Error",
        text: "Error al registrar usuario: " + error.message,
        icon: "error",
      });
    }
  };

  const guardarUsuarioFirestore = async (fullName, email, uid) => {
    try {
      const nuevoUsuario = { fullName, email, uid };
      const collectionUsuario = collection(database, "usuarios");
      await addDoc(collectionUsuario, nuevoUsuario);
    } catch (error) {
      console.error("Error al guardar usuario en Firestore:", error);
    }
  };

  const registrarUsuario = async () => {
    if (!fullName || !user || !password) {
      Swal.fire({
        title: "Error",
        text: "Por favor, complete todos los campos",
        icon: "error",
      });
      return;
    }
    crearUsuarioFirebase();
  };

  return (
    <div className="register-background">
      <div className="containerR">
        <form className="form-registro" noValidate>
          <div>
            <input
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Nombre completo"
              required
            />
          </div>
          <div>
            <input
              onChange={(e) => setUser(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Nombre de usuario"
              required
            />
          </div>
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="col-12">
          
          </div>
          <div>
            <button className="btn" onClick={registrarUsuario} type="button">
              Registrar            
              </button>

            <button className="btn" onClick={() => navigate(-1)} type="button">
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
