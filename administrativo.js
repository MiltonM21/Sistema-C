let personal = JSON.parse(localStorage.getItem('personal')) || []; // Cargar datos desde localStorage
        const form = document.getElementById('personal-form');
        const personalList = document.getElementById('personal-list');

        // Definir el rol de usuario actual
        const currentUserRole = 'administrador';

        // Función para renderizar la tabla
        function renderTable() {
            personalList.innerHTML = '';
            personal.forEach((miembro, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${miembro.nombre}</td>
                    <td>${miembro.cargo}</td>
                    <td>
                        ${currentUserRole === 'administrador' ? `<button class="btn btn-warning btn-sm" onclick="editPersonal(${index})">Editar</button>` : ''}
                        ${currentUserRole === 'administrador' ? `<button class="btn btn-danger btn-sm" onclick="deletePersonal(${index})">Eliminar</button>` : ''}
                    </td>
                `;
                personalList.appendChild(row);
            });
        }

        // Función para guardar en localStorage
        function saveToLocalStorage() {
            localStorage.setItem('personal', JSON.stringify(personal));
        }

        // Función para agregar o editar personal
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const index = form.index.value; // Obtener el índice desde el campo oculto
            const miembro = {
                nombre: form.nombre.value,
                cargo: form.cargo.value
            };

            if (index === '') {
                personal.push(miembro);  // Agregar nuevo personal
            } else {
                personal[index] = miembro;  // Editar personal existente
                form.index.value = '';  // Limpiar el índice
            }

            form.reset();  // Limpiar el formulario
            renderTable();  // Actualizar la tabla
            saveToLocalStorage(); // Guardar en localStorage
        });

        // Función para editar un miembro del personal
        function editPersonal(index) {
            const miembro = personal[index];
            form.nombre.value = miembro.nombre;
            form.cargo.value = miembro.cargo;
            form.index.value = index; // Guardar el índice en el campo oculto
        }

        // Función para eliminar un miembro del personal
        function deletePersonal(index) {
            personal.splice(index, 1);
            renderTable();
            saveToLocalStorage(); // Guardar en localStorage
        }

        // Inicializa la tabla al cargar
        renderTable();
