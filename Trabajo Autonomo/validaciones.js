// Función para validar el formulario de registro
function validarRegistro(e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const idnumber = document.getElementById("idnumber").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;d
    const terms = document.getElementById("terms").checked;

    // Validar campos vacíos
    if (!fullname || !idnumber || !phone || !role || !email || !password || !confirmPassword) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Ingresa un correo electrónico válido.");
        return;
    }

    // Validar que contraseñas coincidan
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Validar aceptación de términos
    if (!terms) {
        alert("Debes aceptar los términos y condiciones.");
        return;
    }

    // Si todo está bien, guardar usuario en localStorage
    const user = {
        fullname,
        idnumber,
        phone,
        role,
        email,
        password
    };

    localStorage.setItem(email, JSON.stringify(user));

    alert("Registro exitoso. Ahora inicia sesión.");
    window.location.href = "login.html";
}

// Función para validar login
function validarLogin(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Ingresa tu correo y contraseña.");
        return;
    }

    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        alert("¡Bienvenido " + user.fullname + " (" + user.role + ")!");

        // Guardar usuario activo
        localStorage.setItem("usuarioActivo", email);

        // Redirigir según el tipo de usuario
        if (user.role === "Estudiante") {
            window.location.href = "Estudiante.html";
        } else if (user.role === "funcionario") {
            window.location.href = "funcionario.html";
        } else {
            alert("Rol no reconocido.");
        }

    } else {
        alert("Correo o contraseña incorrectos.");
    }
}

