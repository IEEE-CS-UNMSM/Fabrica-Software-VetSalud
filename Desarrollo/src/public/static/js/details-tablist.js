const detallesArray = document.querySelectorAll(".detalles-abrir");
const aceptar = document.querySelector("#aceptar");
const mensaje = document.querySelector("#mensaje");
const antecedenteSpan = document.getElementById("antecedente");
const diagnosticoSpan = document.getElementById("diagnostico");
const tratamientoSpan = document.getElementById("tratamiento");

detallesArray.forEach((detalles) => {
    detalles.addEventListener("click", (event) => {
        event.preventDefault();
        const fichaId = detalles.getAttribute("data-ficha-id");
        const antecedentes = detalles.getAttribute("data-antecedentes");
        const diagnostico = detalles.getAttribute("data-diagnostico");
        const tratamiento = detalles.getAttribute("data-tratamiento");
        // Mostrar la información en el diálogo
        antecedenteSpan.textContent = antecedentes;
        diagnosticoSpan.textContent = diagnostico;
        tratamientoSpan.textContent = tratamiento;
        // Mostrar el diálogo
        mensaje.showModal();
    });
});

aceptar.addEventListener("click", () => {
    mensaje.close();
});