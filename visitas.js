let visitas = [];
        const reclusos = JSON.parse(localStorage.getItem('reclusos')) || [];
        
        const form = document.getElementById('visitas-form');
        const visitasList = document.getElementById('visitas-list');
        const reclusoVisitadoSelect = document.getElementById('reclusoVisitado');
        const historialVisitasDiv = document.getElementById('historial-visitas');
        const modalVisitasList = document.getElementById('modal-visitas-list');

        // Cargar reclusos en el select
        function cargarReclusos() {
            reclusos.forEach(recluso => {
                const option = document.createElement('option');
                option.value = recluso.idRecluso; // Usar el idRecluso como valor
                option.textContent = `${recluso.nombreRecluso} (ID: ${recluso.idRecluso})`; // Mostrar el nombre y el ID
                reclusoVisitadoSelect.appendChild(option);
            });
        }

        // Función para renderizar la tabla de visitas
        function renderVisitas() {
            visitasList.innerHTML = '';
            visitas.forEach((visita, index) => {
                const recluso = reclusos.find(r => r.idRecluso === visita.reclusoVisitado); // Buscar el recluso por ID
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${visita.nombreVisitante}</td>
                    <td>${recluso ? recluso.nombreRecluso : 'Recluso no encontrado'} (ID: ${visita.reclusoVisitado})</td>
                    <td>${visita.fechaVisita}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="eliminarVisita(${index})">Eliminar</button>
                    </td>
                `;
                visitasList.appendChild(row);
            });
        }

        // Función para eliminar una visita
        // Variable para almacenar el índice de la visita a eliminar
let visitaAEliminarIndex = null;

// Función para eliminar una visita
function eliminarVisita(index) {
    visitaAEliminarIndex = index; // Guardar el índice de la visita a eliminar
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    modal.show(); // Mostrar el modal
}

// Evento para el botón de confirmación de eliminación
document.getElementById('confirmDeleteButton').addEventListener('click', () => {
    if (visitaAEliminarIndex !== null) {
        visitas.splice(visitaAEliminarIndex, 1); // Eliminar la visita del array
        guardarVisitas(); // Guardar cambios en localStorage
        renderVisitas(); // Volver a renderizar la tabla
        renderHistorial(); // Volver a renderizar el historial
        visitaAEliminarIndex = null; // Reiniciar el índice
        const modal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
        modal.hide(); // Ocultar el modal
    }
});

        function abrirModalHistorial(reclusoId) {
            const reclusoHistorial = visitas.filter(visita => visita.reclusoVisitado === reclusoId);
            modalVisitasList.innerHTML = '';  // Limpiar el contenido anterior
            reclusoHistorial.forEach(visita => {
                const li = document.createElement('li');
                li.textContent = `${visita.nombreVisitante} - ${visita.fechaVisita}`;
                modalVisitasList.appendChild(li);
            });
            const modal = new bootstrap.Modal(document.getElementById('visitaModal'));
            modal.show();
        }
        // Función para renderizar el historial de visitas por recluso
        // Función para renderizar el historial de visitas por recluso
function renderHistorial() {
    historialVisitasDiv.innerHTML = '';
    reclusos.forEach(recluso => {
        const reclusoHistorial = visitas.filter(visita => visita.reclusoVisitado === recluso.idRecluso);
        if (reclusoHistorial.length > 0) {
            const div = document.createElement('div');
            div.classList.add('col-md-3', 'text-center', 'mb-4');

            // Imagen del recluso (agregar ruta de imagen)
            const img = document.createElement('img');
            img.src = `icono.webp`; 
            img.alt = `Imagen de ${recluso.nombreRecluso}`;
            img.classList.add('rounded-circle', 'img-fluid');
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => abrirModalHistorial(recluso.idRecluso));

            // Nombre del recluso debajo de la imagen
            const nombre = document.createElement('p');
            nombre.textContent = recluso.nombreRecluso;
            div.appendChild(img);
            div.appendChild(nombre);
            historialVisitasDiv.appendChild(div);
        }
    });
}

        // Guardar visitas en localStorage
        function guardarVisitas() {
            localStorage.setItem('visitas', JSON.stringify(visitas));
            // Actualizar el contador total de visitas
            let totalVisitas = localStorage.getItem('totalVisitas') ? parseInt(localStorage.getItem('totalVisitas')) : 0;
            // Establecer el total de visitas según el número de visitas actuales
            localStorage.setItem('totalVisitas', visitas.length);
        }

        // Cargar visitas desde localStorage al inicio
        function cargarVisitas() {
            visitas = JSON.parse(localStorage.getItem('visitas')) || [];
            renderVisitas();
            renderHistorial();
            // Actualizar el contador en actividades.html
            document.getElementById('num-visitas').innerText = localStorage.getItem('totalVisitas') || 0;
        }

        // Manejar el envío del formulario
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir el envío por defecto
            const nuevaVisita = {
                nombreVisitante: form.nombreVisitante.value,
                reclusoVisitado: form.reclusoVisitado.value,
                fechaVisita: form.fechaVisita.value,
            };
            visitas.push(nuevaVisita);
            guardarVisitas();
            renderVisitas();
            renderHistorial();
            form.reset(); // Limpiar el formulario después de registrar la visita
        });

        // Cargar reclusos y visitas al iniciar la página
        cargarReclusos();
        cargarVisitas();