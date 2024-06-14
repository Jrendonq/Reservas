import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { database } from "../database/firedatabaseConfig"; // Ajusta la ruta según tu estructura de proyecto
import Swal from "sweetalert2";
import Navbar from "./Navbar"; // Ajusta la ruta según tu estructura de proyecto

const Reserva = () => {
  const [room, setRoom] = useState(""); // Estado para la sala
  const [seat, setSeat] = useState(""); // Estado para la silla
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Opciones predefinidas para las salas y sillas
  const salas = ["Sala 1", "Sala 2", "Sala 3", "Sala 4", "Sala 5", "Sala 6"];
  const sillas = ["Silla 1", "Silla 2", "Silla 3", "Silla 4", "Silla 5", "Silla 6",
                  "Silla 7", "Silla 8", "Silla 9", "Silla 10", "Silla 11", "Silla 12",
                  "Silla 13", "Silla 14", "Silla 15", "Silla 16", "Silla 17", "Silla 18",
                  "Silla 19", "Silla 20"];

  const handleReserva = async () => {
    try {
      if (!room || !seat || !date || !time) {
        Swal.fire({
          title: "Error",
          text: "Por favor completa todos los campos.",
          icon: "error",
        });
        return;
      }

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Swal.fire({
          title: "Error",
          text: "No se ha podido obtener la información del usuario. Por favor inicia sesión de nuevo.",
          icon: "error",
        });
        return;
      }

      const userId = user.uid;
      const userRef = ref(database, `reservations/${userId}`);

      const startTime = `${date} ${time}`;
      const startDateTime = new Date(`${date}T${time}`);
      const endDateTime = new Date(startDateTime.getTime() + 3 * 60 * 60 * 1000);
      const endHours = endDateTime.getHours().toString().padStart(2, '0');
      const endMinutes = endDateTime.getMinutes().toString().padStart(2, '0');
      const endTime = `${endHours}:${endMinutes}`;

      const nuevaReserva = {
        room,
        seat,
        startTime,
        endTime: `${date} ${endTime}`,
      };

      await push(userRef, nuevaReserva);

      Swal.fire({
        title: "Reserva exitosa",
        text: "Tu reserva ha sido registrada.",
        icon: "success",
      });

      // Limpiar los campos después de la reserva exitosa
      setRoom("");
      setSeat("");
      setDate("");
      setTime("");
      
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="reserva">
      <Navbar />
      <div className="reserva-container">
        <h5>Reserva una Sala</h5>
        <form>
          <div>
            {/* Selector de sala */}
            <select
              onChange={(e) => setRoom(e.target.value)}
              value={room}
              className="form-control"
              id="room"
            >
              <option value="">Selecciona Aula</option>
              {salas.map((sala, index) => (
                <option key={index} value={sala}>{sala}</option>
              ))}
            </select>
          </div>
           {/* Doble salto de línea */}
           <br />
          <div>
            {/* Selector de silla */}
            <select
              onChange={(e) => setSeat(e.target.value)}
              value={seat}
              className="form-control"
              id="seat"
            >
              <option value="">Selecciona Equipo</option>
              {sillas.map((silla, index) => (
                <option key={index} value={silla}>{silla}</option>
              ))}
            </select>
          </div>
           {/* Doble salto de línea */}
           <br />
          <div>
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="form-control"
              id="date"
              value={date}
            />
          </div>
           {/* Doble salto de línea */}
           <br />
          <div>
            <input
              onChange={(e) => setTime(e.target.value)}
              type="time"
              className="form-control"
              id="time"
              value={time}
            />
          </div>
          <button onClick={handleReserva} className="btn" type="button">
            Reservar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reserva;
