fetch('/obtener-mascotas')
    .then(response => response.json())
    .then(data => {
        const selectMascotas = document.getElementById('mascotas');

        data.forEach(mascota => {
            const option = document.createElement('option');
            option.value = mascota.ID_MASCOTA;
            option.text = mascota.NOMBRE_MASCOTA;
            selectMascotas.add(option);
        });
    })
    .catch(error => console.error('Error al obtener mascotas:', error));