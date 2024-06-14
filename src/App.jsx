import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sesion from "./Sesion";
import Reserva from "./Reserva";
import Visor from "./components/helpers/Visor"; // Ajusta la ruta según la estructura de tu proyecto

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Bienvenido a la Aplicación de Reservas</h1>
        <Routes>
          <Route path="/" element={<Sesion />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/visor" element={<Visor />} />
          {/* Agrega otras rutas según sea necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
