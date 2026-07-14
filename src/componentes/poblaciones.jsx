import React from "react";
import { Link } from "react-router-dom";
import './modalidades.css';

const General = () => {
  

  return (
    <div className="contenedor">
      <div className="navbar1">
          <img src="/imagenes/Logos OSC y SDP.png" className="logo1" alt="Logo" ></img>
            
      </div>
      <h2>Sorteo Modalidad Grupos Poblacionales</h2>
      <p>24 cupos</p>

       <div>
        <Link to="/LGTBIQ"><button className="boton"><span></span>LGBTIQ+</button></Link>
        <Link to="/discapacidad"><button className="boton"><span></span>Discapacidad</button></Link>
        <Link to="/afros"><button className="boton"><span></span>Afrocolombianos</button></Link>
        <Link to="/raizales"><button className="boton"><span></span>Raizales</button></Link>
        <Link to="/indigena"><button className="boton"><span></span>Indígenas</button></Link>
        <Link to="/victimas"><button className="boton"><span></span>Víctimas</button></Link>
        <Link to="/migrantes"><button className="boton"><span></span>Migrantes</button></Link>
        <Link to="/campesinos"><button className="boton"><span></span>Campesinos</button></Link>
        <Link to="/adolecencia"><button className="boton"><span></span>Adolescencia</button></Link>
        <Link to="/palenqueros"><button className="boton"><span></span>Palenqueros</button></Link>
        

      </div>

      <Link to="/">
        <button className="btn-volver">Volver</button>
      </Link>
     
    </div>
    
  );
};

export default General;
