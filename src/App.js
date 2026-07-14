
import React, { useState } from 'react'; // Importamos useState
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import General from "./componentes/localidades";
import Especial from "./componentes/poblaciones";
import Usaquen from "./componentes/usaquen";
import Chapinero from "./componentes/chapinero";
import SantaFe from "./componentes/santafe";
import SanCristobal from "./componentes/sanCristobal";
import Usme from "./componentes/usme";
import Tunjuelito from "./componentes/tunjuelito";
import Bosa from "./componentes/bosa";
import Kennedy from "./componentes/kennedy";
import Fontibon from "./componentes/fontibon";
import Engativa from "./componentes/engativa";
import Suba from "./componentes/suba";
import BarriosUnidos from "./componentes/barriosUnidos";
import Teusaquillo from "./componentes/teusaquillo";
import Martires from "./componentes/martires";
import Antonionariño from "./componentes/antonioNariño";
import PuenteAranda from "./componentes/puenteAranda";
import Candelaria from "./componentes/candelaria";
import RafaelUU from "./componentes/rafaelUU";
import CiudadBolivar from "./componentes/ciudadBolivar";
import Sumapaz from "./componentes/sumapaz";
import LGBTI from "./componentes/LGTBIQ";
import Discapacidad from "./componentes/discapacidad";
import Afro from "./componentes/afros";
import Raizales from "./componentes/raizales";
import Indigenas from "./componentes/indigenas";
import Victimas from "./componentes/victimas";
import Migrantes from "./componentes/migrantes";
import Campesinos from "./componentes/campesinos";
import Adolecencia from "./componentes/adolecencia";
import Palenqueros from "./componentes/palenqueros";
import Generales from "./componentes/generales";
import resultados from "./excel/resultados.xlsx";

function Principal(){
  // 1. Creamos el estado para contar los clics
  const [clickCount, setClickCount] = useState(0);
  // 2. Función que maneja los clics en el banner
  const manejarClicBanner = () => {
    const nuevoConteo = clickCount + 1;
    setClickCount(nuevoConteo);

    if (nuevoConteo === 5) {
      descargarArchivo();
      setClickCount(0); // Opcional: Reinicia el contador si quieres que puedan volver a descargarlo con otros 5 clics
    }
  };
  // 3. Función oculta que fuerza la descarga del archivo
  const descargarArchivo = () => { 
    const link = document.createElement('a');
    link.href = resultados;
    link.setAttribute('download', 'resultados.xlsx'); // Nombre con el que se guardará
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return(
      <div className="banner">
        <div className="navbar" onClick={manejarClicBanner} style={{ cursor: 'pointer' }}>
            <img src="/imagenes/Logos OSC y SDP.png" className="logo" alt="Logo" ></img>
            
        </div>
        <div className="content">
            <h1>Sorteo - Ciclos Deliberativos 2026</h1>
            <p>Total registros: 2.747</p>
            <div>
              <Link to="/localidades"><button className="botones" type="button"><span></span>Modalidad general localidades</button></Link>
              <Link to="/poblaciones"><button className="botones" type="button"><span></span>Modalidad especial grupos poblacionales</button></Link>
            </div>
        </div>
      </div>
  );
}
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/localidades" element={<General />} />
        <Route path="/poblaciones" element={<Especial />} />
        <Route path="/usaquen" element={<Usaquen />} />
        <Route path="/chapinero" element={<Chapinero />} />
        <Route path="/santa fe" element={<SantaFe />} />
        <Route path="/san cristobal" element={<SanCristobal />} />
        <Route path="/usme" element={<Usme />} />
        <Route path="/tunjuelito" element={<Tunjuelito />} />
        <Route path="/bosa" element={<Bosa />} />
        <Route path="/kennedy" element={<Kennedy />} />
        <Route path="/fontibon" element={<Fontibon />} />
        <Route path="/engativa" element={<Engativa />} />
        <Route path="/suba" element={<Suba />} />
        <Route path="/barrios unidos" element={<BarriosUnidos />} />
        <Route path="/teusaquillo" element={<Teusaquillo />} />
        <Route path="/los martires" element={<Martires />} />
        <Route path="/antonio nariño" element={<Antonionariño />} />
        <Route path="/puente aranda" element={<PuenteAranda />} />
        <Route path="/la candelaria" element={<Candelaria />} />
        <Route path="/rafael uribe uribe" element={<RafaelUU />} />
        <Route path="/ciudad bolivar" element={<CiudadBolivar />} />
        <Route path="/sumapaz" element={<Sumapaz />} />
        <Route path="/LGTBIQ" element={<LGBTI />} />
        <Route path="/discapacidad" element={<Discapacidad />} />
        <Route path="/afros" element={<Afro />} />
        <Route path="/raizales" element={<Raizales />} />
        <Route path="/indigena" element={<Indigenas />} />
        <Route path="/victimas" element={<Victimas />} />
        <Route path="/migrantes" element={<Migrantes />} />
        <Route path="/campesinos" element={<Campesinos />} />
        <Route path="/adolecencia" element={<Adolecencia />} />
        <Route path="/palenqueros" element={<Palenqueros />} />
        <Route path="/generales" element={<Generales />} />
        
      </Routes>
    </Router>
  );
};

export default App;
