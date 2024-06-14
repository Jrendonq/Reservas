import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="fondoPP">
        <div className="containerI">
        <img src="/Logo-Cesde.svg" alt="" loading="lazy" className="" />
          <h3 className="titlesec">
            TE <img src="/reserva.svg" alt="" loading="lazy" className="imgreserva" />
            <br />
            CONECTA
          </h3>
        
        {/* Descripción del servicio */}
        <p>
          Descubre nuestro servicio exclusivo de préstamo de PCs en <strong>nuestra institución</strong>.
          <br />
          ¡Sumérgete en el mundo digital con nuestras modernas aulas de computación, disponibles para reservar <strong>fácilmente</strong> a través de nuestra página web!
        </p>

        {/* Botón de redirección */}
        <Link id="vamos" className="btn" to="/sesion">
          Vamos
        </Link>
      </div>
    </div>
  );
}





export default Inicio;
