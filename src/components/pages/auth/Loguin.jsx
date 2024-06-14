// Loguin.jsx

import React from "react";

function Loguin({ registros }) {
  return (
    <>
      <h2 className="poetsen-one-regular">Mis Reservas</h2>
      <ul>
        {registros.map((registro, index) => (
          <li className="briem-hand" key={index}>
            Aula: {registro.aula}, Equipo: {registro.equipo}, Fecha:{" "}
            {registro.fecha}, Hora: {registro.hora},
          </li>
        ))}
      </ul>
    </>
  );
}

export default Loguin;
