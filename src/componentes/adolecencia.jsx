import React, { useEffect, useState } from "react";
import { leerExcelAdolescencia } from "../excel/leerExcelAdolecencia"; 
import "./sorteo2.css";
import { Link } from "react-router-dom";
import { API_URL } from '../config';

function AppAdolescencia() {
  const [count, setCount] = useState(0);
  const [adolescencia, setAdolescencia] = useState([]);
  const [ganadoresAdolescencia, setGanadoresAdolescencia] = useState([]);
  //const [todosLosGanadores, setTodosLosGanadores] = useState([]);

  useEffect(() => {
    leerExcelAdolescencia().then((res) => {
      // quitamos encabezado si lo hay
      setAdolescencia(res.slice(1));
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
    setAdolescencia(restantes);

    // Agregar al acumulado global
    /*setTodosLosGanadores((prev) => [
      ...prev,
      { categoria: `Adolescencia - Cupo ${count + 1}`, seleccionados }
    ]);*/

    // Aumentamos contador
    setCount((prev) => prev + 1);

    // Si se completaron 4 cupos, desactivar botón
    if (cupos >= (count + 1)) {
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
        nombre: "No Aplica",
        tipo: "No Aplica",
        numeroid: titular[1]
      });

      // Procesar los Suplentes (del índice 1 en adelante)
      resultadolocalidad.slice(1).forEach((s, idx) => {
        datosParaEnviar.push({
          localidad: categoria,
          categoria: "Cupo " + (count + 1),
          resultado: `Suplente ${idx + 1}`,
          id: s[0],
          nombre: "No Aplica",
          tipo: "No Aplica",
          numeroid: s[1]
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
        <h1 className="titulo">Adolescencia</h1>
        <h1 className="titulo"> 4 cupos</h1>
        <h2>Total: {adolescencia.length}</h2>
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
                {adolescencia.map((fila, i) => (
                  <tr key={i}>
                    <td>{fila[0]}</td>
                    <td>{fila[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          <div className="sorteo-container">
              <div className="boton-container"> <button
                type="button"
                className="btn-comenzar"
                onClick={(e) => sortear(adolescencia, setGanadoresAdolescencia, 4, e, "Adolescencia")}
              >
                Comenzar sorteo
              </button></div>
              
              {ganadoresAdolescencia.length > 0 && (
                <div className="ganadores">
                  <h3>Seleccionados Cupo {count}</h3>
                  <p className="titular">
                    <strong>Titular:</strong> {ganadoresAdolescencia[0][0]} - {ganadoresAdolescencia[0][1]}
                  </p>
                  <ul>
                    {ganadoresAdolescencia.slice(1).map((g, idx) => (
                      <li key={idx}>
                        <strong>Suplente {idx + 1}:</strong> {g[0]} - {g[1]}
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

export default AppAdolescencia;
