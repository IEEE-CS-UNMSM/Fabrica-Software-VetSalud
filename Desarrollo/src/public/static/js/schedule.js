$(document).ready(function() {
    fetch('/obtener-citas')
    .then(response => response.json())
    .then(data => {
        const eventos = data.map(cita => {
            
            return {
                id: cita.id,
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