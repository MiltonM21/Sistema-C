let reclusos = [];
let reclusoAEliminarIndex = null; // Variable para almacenar el índice del recluso a eliminar

const form = document.getElementById('reclusos-form');
const reclusosList = document.getElementById('reclusos-list');

// Función para renderizar la tabla
function renderTable() {
    reclusosList.innerHTML = '';
    reclusos.forEach((recluso, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recluso.nombreRecluso}</td>
            <td>${recluso.idRecluso}</td>
            <td>${recluso.añosCondena}</td>
            <td>${recluso.delito}</td>
            <td>${recluso.fechaIngreso}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editRecluso(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="confirmDeleteRecluso(${index})">Eliminar</button>
            </td>
        `;
        reclusosList.appendChild(row);
    });
}

// Función para cargar los reclusos almacenados
function cargarReclusos() {
    const storedReclusos = localStorage.getItem('reclusos');
    if (storedReclusos) {
        reclusos = JSON.parse(storedReclusos);
        renderTable();
    }
}

// Función para guardar los reclusos en localStorage
function guardarReclusos() {
    localStorage.setItem('reclusos', JSON.stringify(reclusos));
}

// Función para verificar si un recluso ya existe
function isReclusoDuplicado(idRecluso) {
    return reclusos.some(recluso => recluso.idRecluso === idRecluso);
}

// Función para agregar o editar un recluso
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const recluso = {
        nombreRecluso: form.nombreRecluso.value,
        idRecluso: form.idRecluso.value,
        añosCondena: form.añosCondena.value,
        delito: form.delito.value,
        fechaIngreso: form.fechaIngreso.value
    };
    const index = form.index.value;

    if (index === '') {
        if (isReclusoDuplicado(recluso.idRecluso)) {
            alert("Ya existe un recluso con esa identificación.");
            return;
        }
        reclusos.push(recluso);  // Agregar recluso
    } else {
        reclusos[index] = recluso;  // Editar recluso existente
        form.index.value = '';  // Limpiar el índice
    }

    form.reset();  // Limpiar el formulario
    guardarReclusos();  // Guardar los reclusos en localStorage
    renderTable();  // Actualizar la tabla
});

// Función para editar un recluso
function editRecluso(index) {
    const recluso = reclusos[index];
    form.nombreRecluso.value = recluso.nombreRecluso;
    form.idRecluso.value = recluso.idRecluso;
    form.añosCondena.value = recluso.añosCondena;
    form.delito.value = recluso.delito;
    form.fechaIngreso.value = recluso.fechaIngreso;
    form.index.value = index;
}

// Función para confirmar la eliminación de un recluso
function confirmDeleteRecluso(index) {
    reclusoAEliminarIndex = index; // Guardar el índice del recluso a eliminar
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    modal.show(); // Mostrar el modal
}

// Evento para el botón de confirmación de eliminación
document.getElementById('confirmDeleteButton').addEventListener('click', () => {
    if (reclusoAEliminarIndex !== null) {
        reclusos.splice(reclusoAEliminarIndex, 1); // Eliminar el recluso del array
        guardarReclusos(); // Guardar cambios en localStorage
        renderTable(); // Volver a renderizar la tabla
        reclusoAEliminarIndex = null; // Reiniciar el índice
        const modal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
        modal.hide(); // Ocultar el modal
    }
});

// Inicializar la tabla con los datos almacenados
cargarReclusos();
