let numVisitas = 0;
        let numEventos = 0;
        let numActividades = 0;
// Función para actualizar las estadísticas
function updateStatistics() {
    document.getElementById('num-visitas').innerText = numVisitas;
    document.getElementById('num-eventos').innerText = numEventos;
    document.getElementById('num-actividades').innerText = numActividades;
}

// Función para inicializar los contadores
function inicializarContadores() {
    const totalVisitas = localStorage.getItem('totalVisitas');
    const totalEventos = localStorage.getItem('totalEventos');
    const totalActividades = localStorage.getItem('totalActividades');

    numVisitas = totalVisitas ? parseInt(totalVisitas) : 0;
    numEventos = totalEventos ? parseInt(totalEventos) : 0;
    numActividades = totalActividades ? parseInt(totalActividades) : 0;

    updateStatistics(); // Actualizar la visualización
}

// Función para cargar actividades desde el localStorage
function cargarActividades() {
    const actividadesGuardadas = JSON.parse(localStorage.getItem('actividades')) || [];

    actividadesGuardadas.forEach(actividad => {
        agregarActividadALaLista(actividad);
    });
}

// Función para agregar actividad a la lista
function agregarActividadALaLista(actividad) {
    const detallesActividades = document.getElementById('detalles-actividades');
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = `${actividad.descripcion} - Fecha: ${actividad.fecha} (${actividad.tipo})`;

    // Crear botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-end';
    deleteButton.innerText = 'Eliminar';
    deleteButton.onclick = function() {
        detallesActividades.removeChild(listItem);
        if (actividad.tipo === 'evento') {
            numEventos--;
            localStorage.setItem('totalEventos', numEventos); // Actualizar en localStorage
        } else if (actividad.tipo === 'actividad-recreativa') {
            numActividades--;
            localStorage.setItem('totalActividades', numActividades); // Actualizar en localStorage
        }

        // Eliminar actividad del localStorage
        const actividadesGuardadas = JSON.parse(localStorage.getItem('actividades')) || [];
        const index = actividadesGuardadas.findIndex(a => a.descripcion === actividad.descripcion && a.fecha === actividad.fecha);
        if (index !== -1) {
            actividadesGuardadas.splice(index, 1);
            localStorage.setItem('actividades', JSON.stringify(actividadesGuardadas));
        }

        updateStatistics(); // Actualizar las estadísticas
    };

    listItem.appendChild(deleteButton);
    detallesActividades.appendChild(listItem);
}

// Función para registrar la actividad
document.getElementById('actividad-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const tipoActividad = document.getElementById('tipo-actividad').value;
    const actividad = document.getElementById('actividad').value;
    const fechaActividad = document.getElementById('fecha-actividad').value;

    // Crear objeto de actividad
    const nuevaActividad = {
        tipo: tipoActividad,
        descripcion: actividad,
        fecha: fechaActividad
    };

    // Agregar actividad al localStorage
    const actividadesGuardadas = JSON.parse(localStorage.getItem('actividades')) || [];
    actividadesGuardadas.push(nuevaActividad);
    localStorage.setItem('actividades', JSON.stringify(actividadesGuardadas));

    // Contar eventos o actividades recreativas
    if (tipoActividad === 'evento') {
        numEventos++;
        localStorage.setItem('totalEventos', numEventos); // Guardar en localStorage
    } else if (tipoActividad === 'actividad-recreativa') {
        numActividades++;
        localStorage.setItem('totalActividades', numActividades); // Guardar en localStorage
    }

    // Limpiar el formulario
    this.reset();
    document.getElementById('tipo-actividad').value = ""; // Reiniciar tipo de actividad

    // Actualizar las estadísticas
    updateStatistics();

    // Agregar la nueva actividad a la lista
    agregarActividadALaLista(nuevaActividad);
});

// Inicializar las estadísticas al cargar
updateStatistics();
inicializarContadores(); // Llamar a la función para inicializar los contadores
cargarActividades(); // Cargar actividades registradas
