import React, { useEffect, useState } from "react";
import { leerYFiltrarExcel } from "../excel/leerExcel";
import "./sorteo2.css";
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const [poblacionCampesinos, setPoblacionCampesinos] = useState([]);
  const [ganadoresCampesinos, setGanadoresCampesinos] = useState([]);
 // const [todosLosGanadores, setTodosLosGanadores] = useState([]);

  useEffect(() => {
    leerYFiltrarExcel().then(({ filtrados }) => {
      const filtroCampesinos = filtrados.filter(
      (fila) =>
        !(
        fila[12]?.trim().toLowerCase() === "sumapaz" && // Localidad sumapaz
        fila[16]?.trim().toLowerCase() === "hombre" &&  // Sexo hombre
        fila[15] >= 29 && 
        fila[15] <= 59                 
      ) &&
        fila[24]?.trim().toLowerCase() === "campesinado" && // Mantener campesinado
        fila[20]?.trim().toLowerCase() === "sí"
      );
      setPoblacionCampesinos(filtroCampesinos);
      
    });
  }, []);

  const sortear = async(participantes, setGanadores, cupos, e, categoria) => {
    if (participantes.length < cupos) {
      alert("No hay suficientes participantes para sortear.");
      return;
    }

    // Mezclamos y seleccionamos ganadores
    const mezclados = [...participantes].sort(() => Math.random() - 0.5);
    const seleccionados = mezclados.slice(0, cupos);

    // Guardamos ganadores en el estado
    setGanadores(seleccionados);
    const resultadolocalidad = seleccionados;

    // Eliminamos ganadores de la lista principal
    const restantes = participantes.filter(
      (p) => !seleccionados.includes(p)
    );
    setPoblacionCampesinos(restantes);

    // Agregar al acumulado global
    /*setTodosLosGanadores((prev) => [
      ...prev,
      { categoria: `Campesinado - Cupo ${count + 1}`, seleccionados }
    ]);*/

    // Aumentamos contador
    setCount((prev) => prev + 1);

    // Si se completaron 3 cupos, desactivar botón
    if (count >= 1) {
      e.target.disabled = true;
    }

    // 1. Estructurar los datos de manera limpia para enviarlos al servidor
    const datosParaEnviar = []
    // Procesar el Titular (índice 0)
    if (resultadolocalidad && resultadolocalidad.length > 0) {
      const titular = resultadolocalidad[0];
      datosParaEnviar.push({
        localidad: categoria,
        categoria: "Cupo " + (count+1),
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
          categoria: "Cupo " + (count+1),
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
      const response = await fetch('http://localhost:5000/api/resultado-poblacionales', {
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
          <h1 className="titulo">Población Campesinados</h1>
          <h1 className="titulo">2 cupos</h1>
          <h2>Total: {poblacionCampesinos.length}</h2>
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
                  {poblacionCampesinos.map((fila, i) => (
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
                onClick={(e) => sortear(poblacionCampesinos, setGanadoresCampesinos, 4, e, "Población Campesinados")}
              >
                Comenzar sorteo
              </button></div>
    
              {ganadoresCampesinos.length > 0 && (
                <div className="ganadores">
                  <h3>Seleccionados Cupo {count}</h3>
                  <p className="titular">
                    <strong>Titular:</strong> {ganadoresCampesinos[0][0]} - {ganadoresCampesinos[0][5]}<br></br>{ganadoresCampesinos[0][7]}
                  </p>
                  <ul>
                    {ganadoresCampesinos.slice(1).map((g, idx) => (
                      <li key={idx}>
                        <strong>Suplente {idx + 1}:</strong> {g[0]} - {g[5]}<br></br>{g[7]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* Botón para descargar TXT */}
          <div className="descargar-container">
            <Link to="/poblaciones">
                <button className="btn-volver">Volver</button>
            </Link>
          </div>
        </div>
      );
}

export default App;
