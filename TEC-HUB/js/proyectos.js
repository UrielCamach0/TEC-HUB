// Obtener elementos del DOM
const addProjectButton = document.querySelector(".btn-add-project");
const projectModal = document.getElementById("project-modal");
const projectForm = document.getElementById("add-project-form");
const projectNameInput = document.getElementById("project-name");
const projectDescriptionInput = document.getElementById("project-description");
const projectProgressInput = document.getElementById("project-progress");
const projectListContainer = document.querySelector(".projects-list");

// Elementos del chat
const chatForm = document.querySelector(".chat-container form");
const chatInput = document.querySelector(".chat-container input");
const chatBox = document.querySelector(".chat-box");

// Abrir el modal para añadir un proyecto
function openProjectModal() {
    projectModal.style.display = "block";
}

// Cerrar el modal para añadir un proyecto
function closeProjectModal() {
    projectModal.style.display = "none";
}

// Manejar el envío del formulario para añadir un proyecto
projectForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const projectName = projectNameInput.value.trim();
    const projectDescription = projectDescriptionInput.value.trim();
    const projectProgress = projectProgressInput.value.trim();

    if (projectName && projectDescription && projectProgress) {
        // Crear un objeto de proyecto
        const project = {
            name: projectName,
            description: projectDescription,
            progress: projectProgress
        };

        // Guardar el proyecto en localStorage
        let projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.push(project);
        localStorage.setItem("projects", JSON.stringify(projects));

        // Agregar el proyecto a la lista de proyectos en la interfaz
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p><strong>Avance:</strong> ${project.progress}%</p>
        `;
        projectListContainer.appendChild(projectCard);

        // Limpiar el formulario y cerrar el modal
        projectNameInput.value = "";
        projectDescriptionInput.value = "";
        projectProgressInput.value = "";
        closeProjectModal();
    }
});

// Cargar proyectos desde localStorage al cargar la pagina
document.addEventListener("DOMContentLoaded", function () {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p><strong>Avance:</strong> ${project.progress}%</p>
        `;
        projectListContainer.appendChild(projectCard);
    });

    renderMessages(); // Renderizar mensajes guardados en el chat
});

// Manejar el envio del formulario del chat
chatForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const messageText = chatInput.value.trim(); // Obtener el texto del mensaje

    if (messageText) {
        // Guardar el mensaje como enviado
        const chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        chatMessages.push({ text: messageText, type: "sent" }); // Agregar el texto y el tipo al array
        localStorage.setItem("chatMessages", JSON.stringify(chatMessages)); // Guardar en localStorage

        renderMessages(); // Volver a renderizar los mensajes
        chatForm.reset(); // Limpiar el formulario
    }
});

// Renderizar mensajes
function renderMessages() {
    const chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || []; // Obtener mensajes
    chatBox.innerHTML = ""; // Limpiar el contenido actual del chat

    chatMessages.forEach((msg, index) => {
        const msgElement = document.createElement("div");
        msgElement.classList.add("message");
        if (msg.type === "sent") msgElement.classList.add("sent"); // Diferenciar tipo de mensaje

        // Añadir texto y boton de eliminacion
        msgElement.innerHTML = `
            <span>${msg.text}</span>
            <button class="btn-delete" onclick="deleteMessage(${index})">×</button>
        `;
        chatBox.appendChild(msgElement);
    });

    // Scroll automatico al ultimo mensaje
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Eliminar un mensaje
function deleteMessage(index) {
    const chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    chatMessages.splice(index, 1); // Eliminar el mensaje correspondiente
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages)); // Guardar cambios
    renderMessages(); // Actualizar los mensajes en la interfaz
}
