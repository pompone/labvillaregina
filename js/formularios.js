// js/formularios.js
(function(){
  // Seleccionamos todos los formularios con la clase contacto-form
  const forms = document.querySelectorAll('form.contacto-form');

  forms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Bloqueamos el botón y cambiamos texto
      btn.disabled    = true;
      btn.textContent = 'Enviando…';

      try {
        const res = await fetch(form.action, {
          method:  form.method,
          body:    new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.reset();
          // Obtenemos mensaje de éxito desde el atributo data-success
          const successMsg = form.dataset.success || '¡Enviado con éxito!';
          alert(successMsg);
        } else {
          const json = await res.json();
          const errors = (json.errors || []).map(e => e.message).join('\n');
          alert(errors || 'Error al enviar.');
        }
      } catch (err) {
        console.error('Error de conexión:', err);
        alert('Error de conexión. Intenta de nuevo más tarde.');
      } finally {
        // Restauramos el botón
        btn.disabled    = false;
        btn.textContent = originalText;
      }
    });
  });
})();
