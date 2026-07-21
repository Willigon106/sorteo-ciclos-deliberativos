import React, { useEffect, useState } from "react";
import { leerYFiltrarExcel } from "../excel/leerExcel";
import { Link } from "react-router-dom";
import "./sorteo2.css";
import { API_URL } from '../config';

function App() {
  //const [mujeresJovenes, setMujeresJovenes] = useState([]);
  const [mujeresMayores, setMujeresMayores] = useState([]);
  const [hombresAdultos, setHombresAdultos] = useState([]);
  //const [ganadoresMujeresJovenes, setGanadoresMujeresJovenes] = useState([]);
  const [ganadoresMujeresMayores, setGanadoresMujeresMayores] = useState([]);
  const [ganadoresHombresAdultos, setGanadoresHombresAdultos] = useState([]);
  const [count, setCount] = useState(0);

  // const [todosLosGanadores, setTodosLosGanadores] = useState([]);

  useEffect(() => {
    leerYFiltrarExcel().then(({ filtrados }) => {
      /*const filtroJovenes = filtrados.filter(
        (fila) =>
          fila[12]?.trim().toLowerCase() === "usaquén" &&
          fila[16]?.trim().toLowerCase() === "mujer" &&
          fila[24]?.trim().toLowerCase() === "ninguna / no aplica" &&
          fila[15] >= 18 &&
          fila[15] <= 59 &&
          fila[14] >= 3 &&
          fila[14] <= 6
      );*/

      const filtroAdultasMayores = filtrados.filter(
        (fila) =>
          fila[12]?.trim().toLowerCase() === "usaquén" &&
          fila[16]?.trim().toLowerCase() === "mujer" &&
          fila[24]?.trim().toLowerCase() === "ninguna / no aplica" &&
          fila[15] >= 29 &&
          fila[14] >= 3 &&
          fila[14] <= 6
      );

      const filtroHombres = filtrados.filter(
        (fila) =>
          fila[12]?.trim().toLowerCase() === "usaquén" &&
          fila[16]?.trim().toLowerCase() === "hombre" &&
          fila[24]?.trim().toLowerCase() === "ninguna / no aplica" &&
          fila[15] >= 29 &&
          fila[14] >= 3 &&
          fila[14] <= 6
      );

      //setMujeresJovenes(filtroJovenes);
      setMujeresMayores(filtroAdultasMayores);
      setHombresAdultos(filtroHombres);
    });
  }, []);

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
    setMujeresMayores(restantes);
  
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
          localidad: "Usaquén",
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
            localidad: "Usaquén",
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

  const sortear = async(participantes, setGanadores, cupos, e, categoria) => {
    if (participantes.length < cupos) {
      alert("No hay suficientes participantes para sortear.");
      return;
    }
    const mezclados = [...participantes].sort(() => Math.random() - 0.5);
    const seleccionados = mezclados.slice(0, 4);

    setGanadores(seleccionados)
    const resultadolocalidad = seleccionados;
  
    // Agregar al acumulado global
    /*setTodosLosGanadores((prev) => [
      ...prev,
      { categoria, seleccionados }
    ]);*/

    // Desactivar botón
    e.target.disabled = true;
    
    // 1. Estructurar los datos de manera limpia para enviarlos al servidor
    const datosParaEnviar = []
    // Procesar el Titular (índice 0)
    if (resultadolocalidad && resultadolocalidad.length > 0) {
      const titular = resultadolocalidad[0];
      datosParaEnviar.push({
        localidad: "Usaquén",
        categoria: categoria,
        resultado: "Titular",
        id: titular[0],
        nombre: titular[5],
        tipo: titular[6],
        numeroid: titular[7] // Ajusta el nombre de la propiedad según lo que represente el índice 7
      });

      // Procesar los Suplentes (del índice 1 en adelante)
      resultadolocalidad.slice(1).forEach((s, idx) => {
        datosParaEnviar.push({
          localidad: "Usaquén",
          categoria: categoria,
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
      <h1 className="titulo">Participantes - Usaquén</h1>
      <h1 className="titulo">3 cupos</h1>

      {/* Bloque Mujeres jovenes y Adultas
      <h2 className="subtitulo">Mujer Joven y Adulta de estrato medio y alto</h2>
      <div className="contenido">
        <div className="tabla-container">
          <p>Total: {mujeresJovenes.length}</p>
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Identificación</th>
              </tr>
            </thead>
            <tbody>
              {mujeresJovenes.map((fila, i) => (
                <tr key={i}>
                  <td>{fila[0]}</td>
                  <td>{fila[7]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sorteo-container">
          <div className="boton-container">
            <button
              type="button"
              className="btn-comenzar"
              onClick={(e) =>
                sortear(mujeresJovenes, setGanadoresMujeresJovenes, 4, e, "Mujer Joven y Adulta de estrato medio y alto")
                
              }
            >
              Comenzar sorteo
            </button>
          </div>

          {ganadoresMujeresJovenes.length > 0 && (
            <div className="ganadores">
              <h3>Seleccionados</h3>
              <p className="titular">
                <strong>Titular:</strong> {ganadoresMujeresJovenes[0][0]} - {ganadoresMujeresJovenes[0][5]}<br></br>{ganadoresMujeresJovenes[0][7]}
              </p>
              <ul>
                {ganadoresMujeresJovenes.slice(1).map((g, idx) => (
                  <li key={idx}>
                    <strong>Suplente {idx + 1}:</strong> {g[0]} - {g[5]}<br></br>{g[7]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>*/}

      {/* Bloque Mujeres Mayores */}
      <h2 className="subtitulo">Mujer adulta y mayor de estrato medio y alto</h2>
      <p className="subtitulo">2 cupos</p>
      <div className="contenido">
        <div className="tabla-container">
          <p>Total: {mujeresMayores.length}</p>
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Identificación</th>
              </tr>
            </thead>
            <tbody>
              {mujeresMayores.map((fila, i) => (
                <tr key={i}>
                  <td>{fila[0]}</td>
                  <td>{fila[7]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sorteo-container">
          <div className="boton-container">
            <button
              type="button"
              className="btn-comenzar"
              onClick={(e) =>
                sortearMujeresAdultas(mujeresMayores, setGanadoresMujeresMayores, 2, e, "Mujer adulta y mayor de estrato medio y alto")
              }
            >
              Comenzar sorteo
            </button>
          </div>

          {ganadoresMujeresMayores.length > 0 && (
            <div className="ganadores">
              <h3>Seleccionados Cupo {count}</h3>
              <p className="titular">
                <strong>Titular:</strong> {ganadoresMujeresMayores[0][0]} - {ganadoresMujeresMayores[0][5]}<br></br>{ganadoresMujeresMayores[0][7]}
              </p>
              <ul>
                {ganadoresMujeresMayores.slice(1).map((g, idx) => (
                  <li key={idx}>
                    <strong>Suplente {idx + 1}:</strong> {g[0]} - {g[5]}<br></br>{g[7]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bloque Hombres Adultos */}
      <h2 className="subtitulo">Hombre adulto y mayor de estrato medio y alto</h2>
      <p className="subtitulo">1 cupo</p>
      <div className="contenido">
        <div className="tabla-container">
          <p>Total: {hombresAdultos.length}</p>
          <table className="tabla" border="1" cellPadding="5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Identificación</th>
              </tr>
            </thead>
            <tbody>
              {hombresAdultos.map((fila, i) => (
                <tr key={i}>
                  <td>{fila[0]}</td>
                  <td>{fila[7]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sorteo-container">
          <div className="boton-container">
            <button
              type="button"
              className="btn-comenzar"
              onClick={(e) =>
                sortear(hombresAdultos, setGanadoresHombresAdultos, 1, e, "Hombre adulto y mayor de estrato medio y alto")
              }
            >
              Comenzar sorteo
            </button>
          </div>

          {ganadoresHombresAdultos.length > 0 && (
            <div className="ganadores">
              <h3>Seleccionados</h3>
              <p className="titular">
                <strong>Titular:</strong> {ganadoresHombresAdultos[0][0]} - {ganadoresHombresAdultos[0][5]}<br></br>{ganadoresHombresAdultos[0][7]}
              </p>
              <ul>
                {ganadoresHombresAdultos.slice(1).map((g, idx) => (
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