const userForm = document.getElementById("add-user-form");
const userTable = document.getElementById("user-table");

// Manejar la adición de usuarios
userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userName = document.getElementById("user-name").value;
    const userEmail = document.getElementById("user-email").value;
    const userRole = document.getElementById("user-role").value;

    // Crear fila de usuario
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${userName}</td>
        <td>${userEmail}</td>
        <td>${userRole}</td>
        <td>
            <button class="btn-edit" onclick="editUser(this)">Editar</button>
            <button class="btn-delete" onclick="deleteUser(this)">Eliminar</button>
        </td>
    `;

    // Agregar fila a la tabla
    userTable.appendChild(row);

    // Limpiar formulario
    userForm.reset();
});

// Editar usuario
function editUser(button) {
    const row = button.parentElement.parentElement;
    const cells = row.querySelectorAll("td");

    const name = cells[0].textContent;
    const email = cells[1].textContent;
    const role = cells[2].textContent;

    document.getElementById("user-name").value = name;
    document.getElementById("user-email").value = email;
    document.getElementById("user-role").value = role;

    row.remove();
}

// Eliminar usuario
function deleteUser(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}
