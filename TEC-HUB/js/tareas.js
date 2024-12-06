// Elementos del DOM
const taskForm = document.getElementById("add-task-form");
const taskList = document.getElementById("task-list");

// Añadir tarea
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const taskDetails = document.getElementById("task-details").value;

    // Crear tarea
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
        <div>
            <strong>${taskName}</strong>
            <p>${taskDetails}</p>
        </div>
        <button onclick="markAsCompleted(this)">✔</button>
    `;

    // Añadir tarea a la lista
    taskList.appendChild(taskItem);

    // Limpiar formulario
    taskForm.reset();
});

// Marcar tarea como completada
function markAsCompleted(button) {
    const taskItem = button.parentElement;
    taskItem.classList.toggle("completed");
}
