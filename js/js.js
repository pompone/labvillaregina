

/* Botón para volver arriba */
document.addEventListener('DOMContentLoaded', () => {
  const btnTop = document.getElementById('btn-top');

  if (btnTop) {
    // Scroll suave al hacer click
    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mostrar u ocultar según el scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btnTop.classList.add('show');
      } else {
        btnTop.classList.remove('show');
      }
    });
  }
});

/* Para mostra efecto de rotacion de fotos */
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let indice = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[indice].classList.remove('activo');
      indice = (indice + 1) % slides.length;
      slides[indice].classList.add('activo');
    }, 4000);
  }
});

/* Botonn hambuerguesa */
  document.addEventListener('DOMContentLoaded', () => {
    const botonHamburguesa = document.getElementById('menu-hamburguesa');
    const menu = document.getElementById('menu');

    if (botonHamburguesa && menu) {
      botonHamburguesa.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('mostrar');
      });

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== botonHamburguesa) {
          menu.classList.remove('mostrar');
        }
      });
    }
  });

/* Aviso temporal de recepción de muestras */
document.addEventListener('DOMContentLoaded', () => {
  const cssAviso = document.createElement('link');
  cssAviso.rel = 'stylesheet';
  cssAviso.href = 'css/aviso-muestras.css';
  document.head.appendChild(cssAviso);

  const aviso = document.createElement('div');
  aviso.className = 'aviso-muestras-overlay';
  aviso.setAttribute('role', 'alert');
  aviso.setAttribute('aria-live', 'assertive');

  const tarjeta = document.createElement('div');
  tarjeta.className = 'aviso-muestras-card';

  const texto = document.createElement('p');
  texto.innerHTML = '<strong>Atención:</strong> Por razones de falta de personal, el laboratorio no está recibiendo muestras.';

  const botonCerrar = document.createElement('button');
  botonCerrar.type = 'button';
  botonCerrar.textContent = 'Entendido';
  botonCerrar.addEventListener('click', () => aviso.remove());

  tarjeta.appendChild(texto);
  tarjeta.appendChild(botonCerrar);
  aviso.appendChild(tarjeta);
  document.body.appendChild(aviso);
});
