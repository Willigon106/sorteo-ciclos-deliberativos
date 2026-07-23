// ruta del archivo excel para la lectura de los datos
import * as XLSX from "xlsx";
import bdFile from "./BD2.xlsx";

export const leerYFiltrarExcel = async () => {
  const response = await fetch(bdFile);
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: "array" });

  const hoja = workbook.Sheets[workbook.SheetNames[0]];
  const datos = XLSX.utils.sheet_to_json(hoja, { header: 1 });


  const normalizar = (texto) =>
    texto?.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();


  // Índices de columnas que son necesarias para el sorteo
  
  const COL_LOCALIDAD  = 12;   // Localidad
  const COL_EDAD       = 15;   // Edad
  const COL_SEXO       = 16;   // Sexo
  const COL_POBLACION  = 24;  // Población

  // Set de poblaciones (normalizadas)
  const poblacionesValidas = new Set(
    [
      "sectores sociales LGBTI",
      "poblacion con discapacidad",
      "poblacion negra afrocolombiana",
      "pueblo raizal",
      "poblacion indigena",
      "victimas del conflicto armado",
      "poblacion migrante internacional",
      "campesinado",
      "poblacion palenquera",
      "adolescencia"
    ].map(normalizar)
  );

  const filtrados = [];
  const sobrantes = [];

  datos.slice(1).forEach((fila) => {
    
    const localidad = normalizar(fila[COL_LOCALIDAD]);
    const edad      = parseInt(fila[COL_EDAD], 10);
    const sexo      = normalizar(fila[COL_SEXO]);
    const poblacion = normalizar(fila[COL_POBLACION]);

    
    // Usaquen
    //const g1 = sexo === "mujer"  && edad >= 18 && edad <= 59;
    const g2 = sexo === "hombre" && edad >= 29;
    const g3 = sexo === "mujer"  && edad >= 29;

    // Chapinero
    const g4 = sexo === "hombre" && edad >= 29;

    // Santa Fe
    const g5 = sexo === "hombre" && edad >= 18 && edad <= 59;

    // San Cristobal
    const g6 = sexo === "mujer"  && edad >= 18 && edad <= 59;
    const g7 = sexo === "hombre" && edad >= 18 && edad <= 59;

    // Usme
    const g8 = sexo === "hombre" && edad >= 18 && edad <= 59;
    const g9 = sexo === "mujer"  && edad >= 18 && edad <= 59;

    // Tunjuelito
    const g10 = sexo === "mujer" && edad >= 18 && edad <= 59;

    // Bosa
    const g11 = sexo === "hombre" && edad >= 18 && edad <= 59;
    const g12 = sexo === "mujer"  && edad >= 18 && edad <= 59;
    //const g13 = sexo === "mujer"  && edad >= 60;

    // Kennedy
    const g14 = sexo === "mujer"  && edad >= 18 && edad <= 59;
    const g15 = sexo === "hombre" && edad >= 18 && edad <= 59;
    //const g16 = sexo === "mujer"  && edad >= 29 && edad <= 59;
    //const g17 = sexo === "hombre" && edad >= 60;

    // Fontibon
    const g18 = sexo === "mujer"  && edad >= 29;
    const g19 = sexo === "hombre" && edad >= 29;

    // Engativa
    const g20 = sexo === "mujer" && edad >= 29;
    const g21 = sexo === "hombre"  && edad >= 29;
    //const g22 = sexo === "hombre" && edad >= 29 && edad <= 59;
    //const g23 = sexo === "mujer"  && edad >= 60;

    // Suba
    const g24 = sexo === "mujer"  && edad >= 29;
    const g25 = sexo === "hombre"  && edad >= 29;
    //const g27 = sexo === "mujer"  && edad >= 60;
    //const g28 = sexo === "hombre" && edad >= 18 && edad <= 28;
    //const g29 = sexo === "hombre" && edad >= 29 && edad <= 59;
    //const g30 = sexo === "hombre" && edad >= 60;

    // Barrios Unidos
    const g31 = sexo === "hombre" && edad >= 29;

    // Teusaquillo
    const g32 = sexo === "mujer" && edad >= 29;

    // Los Mártires
    const g33 = sexo === "mujer" && edad >= 29;

    // Antonio Nariño
    const g34 = sexo === "mujer" && edad >= 29;

    // Puente Aranda
    const g35 = sexo === "hombre" && edad >= 29;

    // La Candelaria
    const g36 = sexo === "hombre" && edad >= 18;

    // Rafael Uribe Uribe
    const g37 = sexo === "mujer"  && edad >= 18 && edad <= 59;
    const g38 = sexo === "hombre" && edad >= 18 && edad <= 59;

    // Ciudad Bolívar
    const g39 = sexo === "mujer"  && edad >= 18 && edad <= 59;
    const g40 = sexo === "hombre"  && edad >= 18 && edad <= 59;

    // Sumapaz
    const g41 = sexo === "hombre" && edad >= 18;
    const g42 = sexo === "mujer" && edad >= 18;

    
    const pasaLocalidad =
      poblacion === "ninguna / no aplica" && (
        (localidad === "usaquen"         && (g2 || g3)) ||
        (localidad === "chapinero"       && g4)               ||
        (localidad === "santa fe"        && g5)               ||
        (localidad === "san cristobal"   && (g6 || g7))       ||
        (localidad === "usme"            && (g8 || g9))       ||
        (localidad === "tunjuelito"      && g10)              ||
        (localidad === "bosa"            && (g11 || g12)) ||
        (localidad === "kennedy"         && (g14 || g15)) ||
        (localidad === "fontibon"        && (g18 || g19))     ||
        (localidad === "engativa"        && (g20 || g21)) ||
        (localidad === "suba"            && (g24 || g25)) ||
        (localidad === "barrios unidos"  && g31)              ||
        (localidad === "teusaquillo"     && g32)              ||
        (localidad === "los martires"    && g33)              ||
        (localidad === "antonio narino"  && g34)              ||
        (localidad === "puente aranda"   && g35)              ||
        (localidad === "la candelaria"   && g36)              ||
        (localidad === "rafael uribe uribe" && (g37 || g38))  ||
        (localidad === "ciudad bolivar"  && (g39 || g40)) ||
        (localidad === "sumapaz"         && (g41 || g42))
      );

    
    const pasaPoblacion = poblacionesValidas.has(poblacion);

    
    if (pasaLocalidad || pasaPoblacion) {
    filtrados.push(fila);
    } else {
    sobrantes.push(fila);
    }
  });

  console.log("Filtrados:", filtrados);
  console.log("Sobrantes:", sobrantes);

  return { filtrados, sobrantes };
};