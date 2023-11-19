const urlSearchParams = new URLSearchParams(window.location.search);
const dni = urlSearchParams.get('dni');

fetch(`/obtener-detalle?dni=${dni}`)
  .then(response => response.json())
  .then(usuario => {
    const mapeoElementos = {
      nombre: 'Nombres',
      apellido: 'Apellidos',
      direccion: 'Direccion',
      dni: 'DNI',
      celular: 'Celular'
    };
    for (const [elementoId, propiedadUsuario] of Object.entries(mapeoElementos)) {
      const elemento = document.getElementById(elementoId);
      if (elemento) {
        elemento.textContent = `${usuario[propiedadUsuario] || ''}`;
      }
    }
  })
  .catch(error => console.error('Error al obtener usuario:', error));