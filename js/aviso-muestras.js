document.addEventListener('DOMContentLoaded', function () {
  const mensaje = 'Por razones de falta de personal, el laboratorio no está recibiendo muestras.';

  const aviso = document.createElement('div');
  aviso.className = 'aviso-muestras-overlay';
  aviso.setAttribute('role', 'alert');
  aviso.setAttribute('aria-live', 'assertive');

  aviso.innerHTML = `
    <div class="aviso-muestras-card">
      <p><strong>Atención:</strong> ${mensaje}</p>
      <button type="button" id="cerrar-aviso-muestras">Entendido</button>
    </div>
  `;

  document.body.appendChild(aviso);

  const botonCerrar = document.getElementById('cerrar-aviso-muestras');
  if (botonCerrar) {
    botonCerrar.addEventListener('click', function () {
      aviso.remove();
    });
  }
});
