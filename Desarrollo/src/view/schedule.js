$(document).ready(function() {
    fetch('/obtener-citas')
    .then(response => response.json())
    .then(data => {
        // Formatear los datos obtenidos y agregarlos a calendarEvents
        const eventos = data.map(cita => {
            return {
                id: cita.ID_CITA,
                name: "Nombre",
                date: cita.FECHA_HORA_CITA,
                description: cita.MOTIVO_CITA,
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