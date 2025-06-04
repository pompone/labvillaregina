// js/temp.js
(function() {
  const tempEl = document.querySelector('.weather-temp');
  const iconEl = document.querySelector('.weather-icon');
  if (!tempEl || !iconEl) return;

  const apiKey = '9d29ff7862f6cb2fa369d1a82e6d1b6c';
  const url = `https://api.openweathermap.org/data/2.5/weather`
            + `?q=Villa%20Regina,AR&units=metric&lang=es&appid=${apiKey}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      // Actualiza la temperatura
      const temp = Math.round(data.main.temp);
      tempEl.textContent = `${temp} °C`;

      // Extrae el código base (por ejemplo "01" de "01d")
      const code = data.weather[0].icon.slice(0,2);

      // Mapeo de código a icono FontAwesome
      const faMap = {
        '01': 'fas fa-sun',                // cielo claro
        '02': 'fas fa-cloud-sun',          // pocas nubes
        '03': 'fas fa-cloud',              // nubes dispersas
        '04': 'fas fa-cloud',              // nublado
        '09': 'fas fa-cloud-showers-heavy',// chaparrón
        '10': 'fas fa-cloud-rain',         // lluvia ligera
        '11': 'fas fa-poo-storm',          // tormenta
        '13': 'fas fa-snowflake',          // nieve
        '50': 'fas fa-smog'                // niebla/bruma
      };

      // Mapeo de código a color
      const colorMap = {
        '01': '#FFD700',  // dorado para sol
        '02': '#FFC107',  // amarillo suave
        '03': '#90A4AE',  // gris azulado
        '04': '#78909C',  // gris medio
        '09': '#29B6F6',  // azul claro
        '10': '#039BE5',  // azul intenso
        '11': '#546E7A',  // gris tormenta
        '13': '#CFD8DC',  // gris nieve
        '50': '#B0BEC5'   // gris niebla
      };

      const iconClass = faMap[code] || 'fas fa-question-circle';
      iconEl.className = `weather-icon ${iconClass} fa-lg`;
      iconEl.style.color = colorMap[code] || '#444';
    })
    .catch(err => {
      console.error('Error al obtener clima:', err);
      tempEl.textContent = '-- °C';
      iconEl.className = 'weather-icon fas fa-exclamation-triangle fa-lg';
      iconEl.style.color = '#E53935';
    });
})();
