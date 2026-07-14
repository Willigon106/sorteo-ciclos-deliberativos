
import { Link } from "react-router-dom";
import './modalidades.css';


const General = () => {
  

  return (
    <div className="contenedor">
      <div className="navbar1">
          <img src="/imagenes/Logos OSC y SDP.png" className="logo1" alt="Logo" ></img>
            
      </div>
      <h2>Sorteo Modalidad Localidades</h2>
      <p>46 cupos</p>

       <div>
        <Link to="/usaquen"><button className="boton"><span></span>Usaquén</button></Link>
        <Link to="/chapinero"><button className="boton"><span></span>Chapinero</button></Link>
        <Link to="/santa fe"><button className="boton"><span></span>Santa Fe</button></Link>
        <Link to="/san cristobal"><button className="boton"><span></span>San Cristóbal</button></Link>
        <Link to="/usme"><button className="boton"><span></span>Usme</button></Link>
        <Link to="/tunjuelito"><button className="boton"><span></span>Tunjuelito</button></Link>
        <Link to="/bosa"><button className="boton"><span></span>Bosa</button></Link>
        <Link to="/kennedy"><button className="boton"><span></span>Kennedy</button></Link>
        <Link to="/fontibon"><button className="boton"><span></span>Fontibón</button></Link>
        <Link to="/engativa"><button className="boton"><span></span>Engativá</button></Link>
        <Link to="/suba"><button className="boton"><span></span>Suba</button></Link>
        <Link to="/barrios unidos"><button className="boton"><span></span>Barrios Unidos</button></Link>
        <Link to="/teusaquillo"><button className="boton"><span></span>Teusaquillo</button></Link>
        <Link to="/los martires"><button className="boton"><span></span>Los Mártires</button></Link>
        <Link to="/antonio nariño"><button className="boton"><span></span>Antonio Nariño</button></Link>
        <Link to="/rafael uribe uribe"><button className="boton"><span></span>Rafael Uribe Uribe</button></Link>
        <Link to="/puente aranda"><button className="boton"><span></span>Puente Aranda</button></Link>
        <Link to="/la candelaria"><button className="boton"><span></span>La Candelaria</button></Link>
        <Link to="/ciudad bolivar"><button className="boton"><span></span>Ciudad Bolívar</button></Link>
        <Link to="/sumapaz"><button className="boton"><span></span>Sumapaz</button></Link>
        <Link to="/generales"><button className="boton"><span></span>Generales</button></Link>
      </div>

      <Link to="/">
        <button className="btn-volver">Volver</button>
      </Link>
     
    </div>
    
  );
};

export default General;
