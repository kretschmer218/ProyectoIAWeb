// --- Configuración de la API del clima ---
// Reemplaza "TU_API_KEY" con tu API Key de OpenWeatherMap
const apiKey = "c994346ab2c3cbe94efa69fe447a97d6";
const urlBase = "https://api.openweathermap.org/data/2.5/weather";

// --- Función principal para buscar el clima ---
async function buscarClima(ciudad) {
  const url = `${urlBase}?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error("Ciudad no encontrada");
    }

    const datos = await respuesta.json();
    mostrarClima(datos);
  } catch (error) {
    document.getElementById("resultado").innerHTML = `
      <p class="text-red-600 font-semibold">Error: ${error.message}</p>
    `;
  }
}

// --- Función para mostrar los datos en pantalla ---
function mostrarClima(datos) {
  document.getElementById("resultado").innerHTML = `
    <h3 class="text-2xl font-bold">${datos.name}</h3>
    <p class="text-lg">Temperatura: <strong>${datos.main.temp}°C</strong></p>
    <p class="capitalize">Clima: ${datos.weather[0].description}</p>
    <p>Humedad: ${datos.main.humidity}%</p>
    <p>Viento: ${datos.wind.speed} km/h</p>
  `;
}

// --- Evento del botón de búsqueda ---
document.getElementById("buscarBtn").addEventListener("click", () => {
  const ciudad = document.getElementById("buscarInput").value.trim();

  if (ciudad.length === 0) {
    document.getElementById("resultado").innerHTML = `
      <p class="text-yellow-700 font-semibold">Por favor, ingresa una ciudad.</p>
    `;
    return;
  }

  buscarClima(ciudad);
});
