// antes de entregar la web, las noticas dejaron de funcionar; problema tenia que registrarme para tener una APIKey
fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.adnrionegro.com.ar/feed/&api_key=hreldxmifyrwxscegwpqkekbibw6gqwcsz7gg4xr')
  .then(response => response.json())
  .then(data => {
    let html = '<ul>';
    data.items.slice(0, 5).forEach(item => {
      html += `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`;
    });
    html += '</ul>';
    document.getElementById('lista-noticias-rn').innerHTML = html;
  })
  .catch(error => {
    console.error('Error cargando las noticias:', error);
    document.getElementById('lista-noticias-rn').innerHTML = '<p>No se pudieron cargar las noticias.</p>';
  });
