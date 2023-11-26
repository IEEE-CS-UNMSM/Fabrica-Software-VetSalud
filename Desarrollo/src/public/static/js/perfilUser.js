const urlSearchParams = new URLSearchParams(window.location.search);
const dni = urlSearchParams.get('dni');
const id = 1;

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

fetch(`/obtener-detalle-mascotas?id=${id}`)
  .then(response => response.json())
  .then(data => {
    const contenedorMascotas = document.getElementById('contenedorMascotas');
    const mascotaElemento = crearElementoMascota(data);
    contenedorMascotas.appendChild(mascotaElemento);
  })
  .catch(error => console.error('Error al obtener datos de mascotas:', error));

function crearElementoMascota(mascota) {
  const mascotaElemento = document.createElement('div');
  mascotaElemento.className = 'mascotaDatos';

  mascotaElemento.innerHTML = `
    <div class="dato">
      <label for="nombre"><strong></strong><span id="nombre">${mascota.NOMBRE_MASCOTA}</span></label>
      <label for="raza"><strong></strong><span id="raza">${mascota.RAZA_MASCOTA}</span></label>
    </div>
  `;

  return mascotaElemento;
}