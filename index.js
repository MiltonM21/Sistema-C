// Credenciales predeterminadas
const validCredentials = {
    username: 'admin',
    password: '12345'
};

const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message'); // Mensaje de éxito

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Resetear mensajes
    errorMessage.textContent = '';
    successMessage.textContent = '';

    // Validar credenciales
    if (username === validCredentials.username && password === validCredentials.password) {
        successMessage.textContent = '¡Inicio de sesión exitoso! Redirigiendo...'; // Mostrar mensaje de éxito

        // Aquí podrías redirigir a otra página después de un retraso
        setTimeout(() => {
            window.location.href = 'reclusos.html'; // Cambia esta URL según sea necesario
        }, 1500); // Redirigir después de 1.5 segundos

    } else {
        errorMessage.textContent = 'Usuario o contraseña incorrectos.';
    }
});
