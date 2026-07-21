import React, { useEffect, useState } from "react";
import { leerYFiltrarExcel } from "../excel/leerExcel";
import "./sorteo2.css";
import { Link } from "react-router-dom";
import { API_URL } from '../config';

function App() {
  const [count, setCount] = useState(0);
  const [poblacionVictimas, setPoblacionVictimas] = useState([]);
  const [ganadoresVictimas, setGanadoresVictimas] = useState([]);
//  const [todosLosGanadores, setTodosLosGanadores] = useState([]);

  useEffect(() => {
    leerYFiltrarExcel().then(({ filtrados }) => {
      
      const filtroVictimas = filtrados.filter(
        (fila) =>
          fila[24]?.trim().toLowerCase() === "víctimas del conflicto armado" &&
          fila[22]?.trim().toLowerCase() === "si"
      );

      setPoblacionVictimas(filtroVictimas);
      
    });
  }, []);

  const sortear = async(participantes, setGanadores, cupos, e, categoria) => {
    if (participantes.length < cupos) {
      alert("No hay suficientes participantes para sortear.");
      return;
    }

    // Mezclamos y seleccionamos ganadores
    const mezclados = [...participantes].sort(() => Math.random() - 0.5);
    const seleccionados = mezclados.slice(0, 4);

    // Guardamos ganadores en el estado
    setGanadores(seleccionados);
    const resultadolocalidad = seleccionados;

    // Eliminamos ganadores de la lista principal
    const restantes = participantes.filter(
      (p) => !seleccionados.includes(p)
    );
    setPoblacionVictimas(restantes);

    // Agregar al acumulado global
    /*setTodosLosGanadores((prev) => [
      ...prev,
      { categoria: `Victimas - Cupo ${count + 1}`, seleccionados }
    ]);*/

    // Aumentamos contador
    setCount((prev) => prev + 1);

    // Si se completaron 3 cupos, desactivar botón
    if (cupos <= (count + 1)) {
      e.target.disabled = true;
    }

    // 1. Estructurar los datos de manera limpia para enviarlos al servidor
    const datosParaEnviar = []
    // Procesar el Titular (índice 0)
    if (resultadolocalidad && resultadolocalidad.length > 0) {
      const titular = resultadolocalidad[0];
      datosParaEnviar.push({
        localidad: categoria,
        categoria: "Cupo " + (count + 1),
        resultado: "Titular",
        id: titular[0],
        nombre: titular[5],
        tipo: titular[6],
        numeroid: titular[7] // Ajusta el nombre de la propiedad según lo que represente el índice 7
      });

      // Procesar los Suplentes (del índice 1 en adelante)
      resultadolocalidad.slice(1).forEach((s, idx) => {
        datosParaEnviar.push({
          localidad: categoria,
          categoria: "Cupo " + (count + 1),
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
      const response = await fetch(`${API_URL}/api/resultado-poblacionales`, {
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
        <h1 className="titulo">Víctimas del conflicto armado</h1>
        <h1 className="titulo"> 3 cupos</h1>
        <h2>Total: {poblacionVictimas.length}</h2>
        <div className="contenido">
          <div className="tabla-container">
            <table className="tabla" border="1" cellPadding="5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Numero de Identificación</th>
                </tr>
              </thead>
              <tbody>
                {poblacionVictimas.map((fila, i) => (
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
                onClick={(e) => sortear(poblacionVictimas, setGanadoresVictimas, 3, e, "Víctimas del conflicto armado")}
              >
                Comenzar sorteo
              </button></div>
              
              {ganadoresVictimas.length > 0 && (
                <div className="ganadores">
                  <h3>Seleccionados Cupo {count}</h3>
                  <p className="titular">
                    <strong>Titular:</strong> {ganadoresVictimas[0][0]} - {ganadoresVictimas[0][5]}<br></br>{ganadoresVictimas[0][7]}
                  </p>
                  <ul>
                    {ganadoresVictimas.slice(1).map((g, idx) => (
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
            <Link to="/poblaciones">
                <button className="btn-volver">Volver</button>
            </Link>
          </div>
      </div>
    );
}

export default App;
