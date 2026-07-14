// excel/leerExcelAdolescencia.js
import * as XLSX from "xlsx";
import bdFile from "./BDAdolecente.xlsx";

export async function leerExcelAdolescencia() {
  const response = await fetch(bdFile);
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });
  
    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const datos = XLSX.utils.sheet_to_json(hoja, { header: 1 });
  return datos;
}
