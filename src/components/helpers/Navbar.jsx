import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link id="inicio" className="navbar-brand" to="/">
          Cerrar sesión
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link id="nosotros" className="nav-link" to="/Reserva">
                Reservas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/visor">
                Mis Reservas
              </Link>
            </li>
            <li className="nav-item ecesde">
              <a
                className="nav-link"
                href="https://edigital.cesde.edu.co/login/index.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                ECESDE
              </a>
            </li>
            <li className="nav-item tickets">
              <a
                className="nav-link"
                href="https://cesdedigital.zohodesk.com/portal/es/newticket/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tickets
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            {/* Formulario de búsqueda, si es necesario */}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
