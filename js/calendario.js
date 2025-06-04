// js/calendario.js
// Genera el calendario mensual y marca los feriados oficiales de Argentina

(async function () {
  const country = 'AR';
  const year = new Date().getFullYear();
  const apiUrl = `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`;

  /* ---------- 1. Cargar feriados ---------- */
  const feriados = {};
  try {
    const resp = await fetch(apiUrl);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    data.forEach(f => (feriados[f.date] = f.localName));
  } catch (err) {
    console.error('No se pudieron cargar feriados:', err);
  }

  /* ---------- 2. Referencia al contenedor ---------- */
  const container = document.getElementById('calendario');
  if (!container) return;

  /* ---------- 3. Utilidad para YYYY-MM-DD en zona local ---------- */
  function fechaLocalISO(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  const todayStr = fechaLocalISO();               // día de hoy sin desfase

  /* ---------- 4. Render del mes ---------- */
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

  function renderCalendar(y, m) {
    container.innerHTML = '';

    /* 4.1 Encabezado mes-año */
    const title = document.createElement('div');
    title.className = 'mes-anio';
    title.innerHTML = `<strong>${monthNames[m]} del ${y}</strong>`;
    container.appendChild(title);

    /* 4.2 Grilla de días */
    const grid = document.createElement('div');
    grid.className = 'cal-grid';

    // Encabezados de la semana
    daysOfWeek.forEach(nom => {
      const head = document.createElement('div');
      head.className = 'header';
      head.textContent = nom;
      grid.appendChild(head);
    });

    // Espacios hasta el primer día del mes
    const firstDay = new Date(y, m, 1).getDay();
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'day inactive';
      grid.appendChild(empty);
    }

    // Días reales del mes
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      cell.className = 'day';
      cell.textContent = d;

      const dateStr = fechaLocalISO(new Date(y, m, d));

      if (dateStr === todayStr) cell.classList.add('hoy');         // resaltar hoy
      if (feriados[dateStr]) {                                     // resaltar feriado
        cell.classList.add('holiday');
        cell.title = feriados[dateStr];
      }
      grid.appendChild(cell);
    }

    container.appendChild(grid);
  }

  /* ---------- 5. Pintar mes actual ---------- */
  const now = new Date();
  renderCalendar(now.getFullYear(), now.getMonth());
})();
