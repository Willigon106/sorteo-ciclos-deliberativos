// src/config.js

// 1. Define aquí tu URL fija de Render (reemplázala por la tuya real)
const URL_PRODUCCION = 'https://sorteo-ciclos-deliberativos.onrender.com';

// 2. Define tu URL local de desarrollo
const URL_LOCAL = 'http://localhost:5000';

// 3. La constante mágica: detecta dónde se está ejecutando la app
export const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? URL_LOCAL
  : URL_PRODUCCION;