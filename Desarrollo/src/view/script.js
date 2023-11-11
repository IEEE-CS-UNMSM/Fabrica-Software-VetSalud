fetch('/obtener-usuarios')
  .then(response => response.json())
  .then(data => {
    const tablaUsuarios = document.getElementById('tablaUsuarios');
    data.forEach(usuario => {
      const fila = `<tr class="tabla-row"><td class="tabla-cell">${usuario.NOMBRES_USUARIO}` +
      `</td><td class="tabla-cell">${usuario.DNI_USUARIO}</td>` +
      `</td><td class="tabla-cell">${usuario.CELULAR_USUARIO}</td></tr>`;
      tablaUsuarios.innerHTML += fila;
    });
  })
  .catch(error => console.error('Error al obtener usuarios:', error));
