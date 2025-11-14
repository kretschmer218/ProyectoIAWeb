// public/js/weather.js
const apiKey = ''; // <-- PONÉ tu API key de OpenWeatherMap aquí o implementar proxy en server

async function getWeatherByCity(city) {
  if (!city) return null;
  if (!apiKey) {
    // fallback: mensaje instructivo
    return { error: 'API key no configurada. Obtén una de https://openweathermap.org/ y colócala en public/js/weather.js o crea un proxy en el servidor.' };
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=es&appid=${apiKey}`;
  const r = await fetch(url);
  if (!r.ok) return { error: 'Ciudad no encontrada' };
  return r.json();
}

document.getElementById('search-btn').addEventListener('click', async () => {
  const city = document.getElementById('city-input').value.trim();
  const res = await getWeatherByCity(city);
  const container = document.getElementById('weather-result');
  if (!res) { container.innerText = 'Ingrese una ciudad.'; return; }
  if (res.error) { container.innerText = res.error; return; }
  container.innerHTML = `
    <div><strong>${res.name}</strong> — ${res.weather[0].description}</div>
    <div>Temperatura: ${res.main.temp} °C</div>
    <div>Humedad: ${res.main.humidity}%</div>
  `;
});
