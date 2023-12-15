const aceptar = document.querySelector("#aceptar");
const mensaje = document.querySelector("#mensaje");
const detallesArray = document.querySelectorAll(".detalles-abrir");

detallesArray.forEach((detalles) => {
    detalles.addEventListener("click", () => {
        mensaje.showModal();
    });
});

aceptar.addEventListener("click", () => {
    mensaje.close();
});