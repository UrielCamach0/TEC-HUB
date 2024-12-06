// Referencias a elementos
const generalForm = document.getElementById("general-settings-form");
const themeSelect = document.getElementById("theme");

// Guardar configuraciones generales
generalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const language = document.getElementById("language").value;
    const notifications = document.getElementById("notifications").checked;

    alert(`Configuracion guardada:
    Idioma: ${language}
    Notificaciones: ${notifications ? "Activadas" : "Desactivadas"}`);
});

// Cambiar tema
themeSelect.addEventListener("change", () => {
    const selectedTheme = themeSelect.value;

    if (selectedTheme === "dark") {
        document.body.style.background = "#333";
        document.body.style.color = "#fff";
    } else {
        document.body.style.background = "#f9f9f9";
        document.body.style.color = "#333";
    }

    alert(`Tema aplicado: ${selectedTheme}`);
});
