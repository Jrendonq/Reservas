import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getAuth } from "firebase/auth";

const Sesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redireccion = useNavigate();
  const auth = getAuth();

  const iniciarSesion = async () => {
    try {
      if (!email || !password) {
        Swal.fire({
          title: "Error",
          text: "Por favor ingresa tu correo electrónico y contraseña.",
          icon: "error",
        });
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "Bienvenido...",
        text: "Ahora podrás reservar",
        icon: "success",
      });
      redireccion("/reserva");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const recuperarContrasena = async () => {
    try {
      if (!email) {
        Swal.fire({
          title: "Error",
          text: "Por favor ingresa tu correo electrónico.",
          icon: "error",
        });
        return;
      }

      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        title: "Correo enviado",
        text: "Revisa tu bandeja de entrada para restablecer tu contraseña.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="Loguin">
      <div className="formulario">
        <h5>Bienvenidos</h5>
        <form>
          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Correo electrónico"
              className="form-control"
              id="email"
            />
          </div>
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Contraseña"
              className="form-control"
              id="password"
            />
            <a className="dropdown-item" href="#" onClick={recuperarContrasena}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          {/* Doble salto de línea */}
          <br />
          <button onClick={iniciarSesion} className="btn" type="button">
            Iniciar sesión
          </button>
          <Link id="registrate" className="btn" to="/registro">
            Regístrate
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Sesion;
