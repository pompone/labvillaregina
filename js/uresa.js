<!-- Script para modales -->
  
(function () {
  const buttons = document.querySelectorAll('.bloque-btn[data-modal]');
  buttons.forEach(btn => {
    const modal = document.querySelector(btn.dataset.modal);
    if (!modal) return;

    const closeBtn = modal.querySelector('.img-modal-close');

    const openModal  = () => {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      // Opcional: evita scroll de fondo
      // document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      // document.body.style.overflow = '';
      // Opcional: devuelve foco
      // btn.focus();
    };

    btn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    /* Cualquier clic dentro del modal lo cierra */
    modal.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  });
})();
