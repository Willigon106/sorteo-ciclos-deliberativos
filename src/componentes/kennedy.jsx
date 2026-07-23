import React, { useEffect, useState } from "react";
import { leerYFiltrarExcel } from "../excel/leerExcel";
import { Link } from "react-router-dom";
import "./sorteo2.css";
import { API_URL } from '../config';

function App() {
  const [count, setCount] = useState(0);
  const [counth, setCounth] = useState(0);
  const [mujeresAdultos, setMujeresAdultos] = useState([]);
  const [hombresJovenes, setHombresJovenes] = useState([]);
  const [ganadoresMujeresAdultas, setGanadoresMujeresAdultas] = useState([]);
  const [ganadoresHombresJovenes, setGanadoresHombresJovenes] = useState([]);

//  const [todosLosGanadores, setTodosLosGanadores] = useState([]);
  useEffect(() => {
    leerYFiltrarExcel().then(({ filtrados }) => {
      // Mujeres 57-79
      const filtroAdultos = filtrados.filter(
        (fila) =>
          fila[12]?.trim().toLowerCase() === "kennedy" &&
          fila[16]?.trim().toLowerCase() === "mujer" &&
          fila[24]?.trim().toLowerCase() === "ninguna / no aplica" &&
          fila[15] >= 18 &&
          fila[15] <= 59 &&
          fila[14] >= 1 &&
          fila[14] <= 4
      );

      // Hombres 30-50
      const filtroMayores = filtrados.filter(
        (fila) =>
          fila[12]?.trim().toLowerCase() === "kennedy" &&
          fila[16]?.trim().toLowerCase() === "hombre" &&
          fila[24]?.trim().toLowerCase() === "ninguna / no aplica" &&
          fila[15] >= 18 &&
          fila[15] <= 59 &&
          fila[14] >= 1 &&
          fila[14] <= 4
      );
      setMujeresAdultos(filtroAdultos);
      setHombresJovenes(filtroMayores);
    });
  }, []);

  const sortear = async(participantes, setGanadores, cupos, e, categoria) => {
    if (participantes.length < cupos) {
    alert("No hay suficientes participantes para sortear.");
    return;
  }

  const mezclados = [...participantes].sort(() => Math.random() - 0.5);
  const ganadoresSeleccionados = mezclados.slice(0, 4);

  setGanadores(ganadoresSeleccionados);
  const resultadolocalidad = ganadoresSeleccionados;

  const restantes = participantes.filter(
    (p) => !ganadoresSeleccionados.includes(p)
  );
  setHombresJovenes(restantes);

  setCounth((prev) => prev + 1);

  if (cupos <= (counth + 1)) {
    e.target.disabled = true;
  }

    // 1. Estructurar los datos de manera limpia para enviarlos al servidor
    const datosParaEnviar = []
    // Procesar el Titular (índice 0)
    if (resultadolocalidad && resultadolocalidad.length > 0) {
      const titular = resultadolocalidad[0];
      datosParaEnviar.push({
        localidad: "Kennedy",
        categoria: categoria + " Cupo " + (counth + 1),
        resultado: "Titular",
        id: titular[0],
        nombre: titular[5],
        tipo: titular[6],
        numeroid: titular[7] // Ajusta el nombre de la propiedad según lo que represente el índice 7
      });

      // Procesar los Suplentes (del índice 1 en adelante)
      resultadolocalidad.slice(1).forEach((s, idx) => {
        datosParaEnviar.push({
          localidad: "Kennedy",
          categoria: categoria + " Cupo " + (counth + 1),
          resultado: `Suplente ${idx + 1}`,
          id: s[0],
          nombre: s[5],
          tipo: s[6],
          numeroid: s[7]
        });
      });
    }
    //console.log("Selecccionados:", datosParaEnviar);
    try {
      // 2. Enviar los datos mapeados al servidor mediante POST
      // Cambia la URL por la de tu servidor (ej. http://localhost:5000/api/guardar-ganadores)
      const response = await fetch(`${API_URL}/api/resultado-localidades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ganadores: datosParaEnviar }),
      });

      const resultado = await response.json();
      
      if (response.ok) {
        console.log(resultado.mensaje || "¡Datos guardados con éxito en el servidor!");
      } else {
        alert("Error en el servidor: " + resultado.error);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor. Verifica que esté encendido.");
    }
  };

const sortearMujeresAdultas = async(participantes, setGanadores, cupos, e, categoria) => {
  if (participantes.length < cupos) {
    alert("No hay suficientes participantes para sortear.");
    return;
  }

  const mezclados = [...participantes].sort(() => Math.random() - 0.5);
  const ganadoresSeleccionados = mezclados.slice(0, 4);

  setGanadores(ganadoresSeleccionados);
  const resultadolocalidad = ganadoresSeleccionados;

  const restantes = participantes.filter(
    (p) => !ganadoresSeleccionados.includes(p)
  );
  setMujeresAdultos(restantes);

  setCount((prev) => prev + 1);

  /*setTodosLosGanadores((prev) => [
    ...prev,
    { categoria: `Mujer Adulta - Cupo ${count + 1}`, seleccionados: ganadoresSeleccionados }
  ]);*/

  if (cupos <= (count + 1)) {
    e.target.disabled = true;
  }

  // 1. Estructurar los datos de manera limpia para enviarlos al servidor
    const datosParaEnviar = []
    // Procesar el Titular (índice 0)
    if (resultadolocalidad && resultadolocalidad.length > 0) {
      const titular = resultadolocalidad[0];
      datosParaEnviar.push({
        localidad: "Kennedy",
        categoria: categoria + " Cupo " + (count + 1),
        resultado: "Titular",
        id: titular[0],
        nombre: titular[5],
        tipo: titular[6],
        numeroid: titular[7] // Ajusta el nombre de la propiedad según lo que represente el índice 7
      });

      // Procesar los Suplentes (del índice 1 en adelante)
      resultadolocalidad.slice(1).forEach((s, idx) => {
        datosParaEnviar.push({
          localidad: "Kennedy",
          categoria: categoria + " Cupo " + (count + 1),
          resultado: `Suplente ${idx + 1}`,
          id: s[0],
          nombre: s[5],
          tipo: s[6],
          numeroid: s[7]
        });
      });
    }
    //console.log("Selecccionados:", datosParaEnviar);
    try {
      // 2. Enviar los datos mapeados al servidor mediante POST
      // Cambia la URL por la de tu servidor (ej. http://localhost:5000/api/guardar-ganadores)
      const response = await fetch(`${API_URL}/api/resultado-localidades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ganadores: datosParaEnviar }),
      });

      const resultado = await response.json();
      
      if (response.ok) {
        console.log(resultado.mensaje || "¡Datos guardados con éxito en el servidor!");
      } else {
        alert("Error en el servidor: " + resultado.error);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor. Verifica que esté encendido.");
    }
};

return (
    <div className="contenedor">
      <h1 className="titulo">Participantes - Kennedy</h1>
      <h1 className="titulo">5 cupos</h1>

      {/* Bloque Mujeres Adultas */}
      <h2 className="subtitulo">Mujer joven y adulta de estrato bajo y medio</h2>
      <p className="subtitulo">3 cupos</p>
      <div className="contenido">
        <div className="tabla-container">
          <p>Total: {mujeresAdultos.length}</p>
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Identificación</th>
              </tr>
            </thead>
            <tbody>
              {mujeresAdultos.map((fila, i) => (
                <tr key={i}>
                  <td>{fila[0]}</td>
                  <td>{fila[7]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sorteo-container">
          <div className="boton-container"> <button
            type="button"
            className="btn-comenzar"
            onClick={(e) => sortearMujeresAdultas(mujeresAdultos, setGanadoresMujeresAdultas, 3, e, "Mujer joven y adulta de estrato bajo y medio")}
          >
            Comenzar sorteo
          </button></div>

          {ganadoresMujeresAdultas.length > 0 && (
            <div className="ganadores">
              <h3>Seleccionados cupo {count}</h3>
              <p className="titular">
                <strong>Titular:</strong> {ganadoresMujeresAdultas[0][0]} - {ganadoresMujeresAdultas[0][5]}<br></br>{ganadoresMujeresAdultas[0][7]}
              </p>
              <ul>
                {ganadoresMujeresAdultas.slice(1).map((g, idx) => (
                  <li key={idx}>
                    <strong>Suplente {idx + 1}:</strong> {g[0]} - {g[5]}<br></br>{g[7]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bloque Hombres Jovenes */}
      <h2 className="subtitulo">Hombre joven y adulto de estrato bajo y medio</h2>
      <p className="subtitulo">2 cupos</p>
      <div className="contenido">
        <div className="tabla-container">
          <p>Total: {hombresJovenes.length}</p>
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Identificación</th>
              </tr>
            </thead>
            <tbody>
              {hombresJovenes.map((fila, i) => (
                <tr key={i}>
                  <td>{fila[0]}</td>
                  <td>{fila[7]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sorteo-container">
          <div className="boton-container"> <button
            type="button"
            className="btn-comenzar"
            onClick={(e) => sortear(hombresJovenes, setGanadoresHombresJovenes, 2, e,"Hombre joven y adulto de estrato bajo y medio")}
          >
            Comenzar sorteo
          </button></div>

          {ganadoresHombresJovenes.length > 0 && (
            <div className="ganadores">
              <h3>Seleccionados cupo {counth}</h3>
              <p className="titular">
                <strong>Titular:</strong> {ganadoresHombresJovenes[0][0]} - {ganadoresHombresJovenes[0][5]}<br></br>{ganadoresHombresJovenes[0][7]}
              </p>
              <ul>
                {ganadoresHombresJovenes.slice(1).map((g, idx) => (
                  <li key={idx}>
                    <strong>Suplente {idx + 1}:</strong> {g[0]} - {g[5]}<br></br>{g[7]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Botón Volver */}
        <div className="descargar-container">
          <Link to="/localidades">
          <button className="btn-volver">Volver</button>
        </Link>
        </div>
    </div>
  );
}

export default App;
