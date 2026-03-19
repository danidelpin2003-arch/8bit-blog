document.addEventListener("DOMContentLoaded", () => {
    console.log("JS conectado correctamente 🚀");

    setupButtons();
    setupContactForm();
});

function setupButtons() {
    const botones = document.querySelectorAll(".read-more");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Aquí iría la página del artículo 🎮");
        });
    });
}

function setupContactForm() {
    const form = document.querySelector(".contact-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const mensaje = document.querySelector("#message").value.trim();

        if (!nombre || !email || !mensaje) {
            alert("Por favor completa todos los campos");
            return;
        }

        if (!validarEmail(email)) {
            alert("Email no válido");
            return;
        }

        alert("Mensaje enviado correctamente 🚀");
        form.reset();
    });
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}