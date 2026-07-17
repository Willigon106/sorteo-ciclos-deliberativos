const express = require('express');
const cors = require('cors');
const ExcelJS = require('exceljs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

// Ruta física donde se guardará el Excel en tu servidor
const EXCEL_PATH = path.join(__dirname, '/data/resultados.xlsx');

app.post('/api/resultado-localidades', async (req, res) => {
    const { ganadores } = req.body;

    if (!ganadores || !Array.isArray(ganadores)) {
        return res.status(400).json({ error: 'Datos no válidos o faltantes.' });
    }

    const workbook = new ExcelJS.Workbook();
    let worksheet;

    try {
        // Intentar leer el archivo Excel si ya existe en el servidor
        await workbook.xlsx.readFile(EXCEL_PATH);
        worksheet = workbook.getWorksheet('Localidades');
    } catch (error) {
        // Si el archivo no existe, se crea desde cero y se configuran las columnas
        worksheet = workbook.addWorksheet('Localidades');
        worksheet.columns = [
            { header: 'Localidad', key: 'localidad', width: 25 },
            { header: 'Categoría', key: 'categoria', width: 25 },
            { header: 'Resultado', key: 'resultado', width: 15 },
            { header: 'ID', key: 'id', width: 15 },
            { header: 'Nombre', key: 'nombre', width: 35 },
            { header: 'Tipo documento', key: 'tipo', width: 35 },
            { header: 'Número documento', key: 'numeroid', width: 30 },
            { header: 'Fecha de Registro', key: 'fecha', width: 20 }
        ];

        // Opcional: Estilo básico para los encabezados
       // worksheet.getRow(1).font = { bold: true };
    }

    // Agregar las nuevas filas enviadas desde React
    ganadores.forEach((ganador) => {
        worksheet.addRow([
            ganador.localidad,
            ganador.categoria,
            ganador.resultado,
            ganador.id,
            ganador.nombre,
            ganador.tipo,
            ganador.numeroid,
            new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
        ]);
    });

    try {
        // Guardar/Sobrescribir el archivo en el servidor con los nuevos datos añadidos
        await workbook.xlsx.writeFile(EXCEL_PATH);
        res.status(200).json({ mensaje: 'Filas agregadas correctamente al archivo Excel del servidor.' });
    } catch (writeError) {
        console.error(writeError);
        res.status(500).json({ error: 'No se pudo escribir en el archivo Excel. Asegúrate de que no esté abierto en el servidor.' });
    }
});

app.post('/api/resultado-poblacionales', async (req, res) => {
    const { ganadores } = req.body;

    if (!ganadores || !Array.isArray(ganadores)) {
        return res.status(400).json({ error: 'Datos no válidos o faltantes.' });
    }
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    try {
        // Intentar leer el archivo Excel si ya existe en el servidor
        await workbook.xlsx.readFile(EXCEL_PATH);
        worksheet = workbook.getWorksheet('Poblacional');
    } catch (error) {
        // Si el archivo no existe, se crea desde cero y se configuran las columnas
        worksheet = workbook.addWorksheet('Poblacional');
        worksheet.columns = [
            { header: 'Localidad', key: 'localidad', width: 25 },
            { header: 'Categoría', key: 'categoria', width: 25 },
            { header: 'Resultado', key: 'resultado', width: 15 },
            { header: 'ID', key: 'id', width: 15 },
            { header: 'Nombre', key: 'nombre', width: 35 },
            { header: 'Tipo documento', key: 'tipo', width: 35 },
            { header: 'Número documento', key: 'numeroid', width: 30 },
            { header: 'Fecha de Registro', key: 'fecha', width: 20 }
        ];

        // Opcional: Estilo básico para los encabezados
       // worksheet.getRow(1).font = { bold: true };
    }

    // Agregar las nuevas filas enviadas desde React
    ganadores.forEach((ganador) => {
        worksheet.addRow([
            ganador.localidad,
            ganador.categoria,
            ganador.resultado,
            ganador.id,
            ganador.nombre,
            ganador.tipo,
            ganador.numeroid,
            new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
        ]);
    });

    try {
        // Guardar/Sobrescribir el archivo en el servidor con los nuevos datos añadidos
        await workbook.xlsx.writeFile(EXCEL_PATH);
        res.status(200).json({ mensaje: 'Filas agregadas correctamente al archivo Excel del servidor.' });
    } catch (writeError) {
        console.error(writeError);
        res.status(500).json({ error: 'No se pudo escribir en el archivo Excel. Asegúrate de que no esté abierto en el servidor.' });
    }
});

const PORT = process.env.PORT || 5000;
// 1. Configura el middleware de CORS
/*app.use(cors({
  origin: [
    'http://localhost:3000', // El puerto local de tu frontend de Vite (cámbialo si usas 3000)
    'https://sorteo-ciclos-deliberativos-4oms.onrender.com/' // La URL que tendrá tu frontend en Render cuando lo despliegues
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Permite el envío de cookies o cabeceras de autorización si las usas
}));*/

// 2. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Optional: Serve Static Frontend Files 
// Uncomment the line below if you want your server to serve a built frontend folder (like 'dist' or 'build')
//app.use(express.static(path.join(__dirname, '../public')));

// 4. Sample API Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running perfectly!' });
});

//app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
// 6. Start the Server
// Render requires binding to host '0.0.0.0' to accept external traffic properly
app.listen(PORT, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(` Server successfully started!`);
    console.log(` Listening on port: ${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`=========================================`);
});