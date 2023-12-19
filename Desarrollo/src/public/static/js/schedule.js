$(document).ready(function() {
    fetch('/obtener-citas')
    .then(response => response.json())
    .then(data => {
        const eventos = data.map(cita => {
            
            return {
                id: cita.Id,
                name: cita.Motivo,
                date: cita['Fecha Cita'],
                description: "Dueño: " + cita.Nombre + "<br>"+cita.Mascota + "<br>" + cita['Numero contacto'],
                type: "schedule appointment"
            };
        });

        $('#calendar').evoCalendar({
            language: "es",
            theme: "Midnight Blue",
            format: 'mm/dd/yyyy',
           eventHeaderFormat: "dd MM yyyy",
            calendarEvents: eventos
        });
    })
    .catch(error => console.error('Error al obtener eventos:', error));
})

$(document).ready(function() {
    $(document).on('click', '#cerrar-popup', function() {
    $('#overlay').hide();
    mensaje.close();
});
    
});
$('#calendar').on('selectEvent', function(event, activeEvent) {
    $('#overlay').show();
    mensaje.showModal();
    document.getElementById('btnIngresar').addEventListener('click', enviarForm);
    function enviarForm() {
    document.getElementById('btnIngresar').disabled = true;
    fecha = new Date().toISOString().slice(0, 19).replace("T", " ");;
    const datos = {
        citaId: activeEvent.id,
        fecha: fecha,
        antc: document.getElementById('chequeo').value,
        diag: document.getElementById('diag').value,
        trat: document.getElementById('trat').value
      };
    const url = '/registrarFicha';
    const opciones = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(datos)
    };
    fetch(url, opciones)
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      window.location.href = '/fichasMedicas';
    })
    .catch(error => {
      console.error('Error al realizar la solicitud POST:', error);
    });
}
});

