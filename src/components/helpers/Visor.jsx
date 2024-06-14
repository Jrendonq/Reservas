import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from "../database/firedatabaseConfig";
import Swal from "sweetalert2";
import Navbar from "./Navbar"; // Ajusta la ruta según tu estructura de proyecto


const Visor = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const obtenerReservas = (userId) => {
      const userRef = ref(database, `reservations/${userId}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const reservasArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setReservas(reservasArray);
        } else {
          setReservas([]);
        }
        setLoading(false);
      });
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        obtenerReservas(user.uid);
      } else {
        setReservas([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="Visor">
      <Navbar /> {/* Aquí se inserta el componente Navbar */}
      <h5 className="titlesec">Mis Reservas</h5>
      <div className="cards-container">
        {reservas.map((reserva) => (
          <div className="card" key={reserva.id}>
            <img
              className="card-image"
              src="/public/logocm.png" // Ajusta la ruta de la imagen según tu proyecto
              alt="Reserva"
            />
            <div className="card-content">
              <strong>Sala:</strong> {reserva.room}
              <br />
              <strong>Silla:</strong> {reserva.seat}
              <br />
              <strong>Hora de inicio:</strong> {reserva.startTime}
              <br />
              <strong>Hora de fin:</strong> {reserva.endTime}
              <br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visor;
