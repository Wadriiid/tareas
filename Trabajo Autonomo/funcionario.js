function mostrarSeccion(id) {
    const secciones = document.querySelectorAll(".seccion");
    secciones.forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    const emailActivo = localStorage.getItem("usuarioActivo");
    if (!emailActivo) {
        alert("Debes iniciar sesión.");
        window.location.href = "login.html";
        return;
    }

    const user = JSON.parse(localStorage.getItem(emailActivo));
    if (!user) {
        alert("Usuario no encontrado.");
        window.location.href = "login.html";
        return;
    }

    // Mostrar datos en perfil
    document.getElementById("nombrePerfilFuncionario").value = user.fullname;
    document.getElementById("emailPerfilFuncionario").value = user.email;
    document.getElementById("telefonoPerfilFuncionario").value = user.phone;
    document.getElementById("cedulaPerfilFuncionario").value = user.idnumber;

    if (user.fotoPerfil) {
        document.getElementById("imagenPerfilFuncionario").src = user.fotoPerfil;
    }

    // Cambiar imagen de perfil
    document.getElementById("subirImagenFuncionario").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                document.getElementById("imagenPerfilFuncionario").src = reader.result;
                user.fotoPerfil = reader.result;
                localStorage.setItem(emailActivo, JSON.stringify(user));
            };
            reader.readAsDataURL(file);
        }
    });

    // Cerrar sesión
    document.getElementById("cerrarSesionFuncionario").addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "login.html";
    });

    cargarCitasParaFuncionario();
    cargarHistorialFuncionario();
});

function guardarPerfilFuncionario() {
    const emailActivo = localStorage.getItem("usuarioActivo");
    const user = JSON.parse(localStorage.getItem(emailActivo));

    user.fullname = document.getElementById("nombrePerfilFuncionario").value;
    user.phone = document.getElementById("telefonoPerfilFuncionario").value;

    localStorage.setItem(emailActivo, JSON.stringify(user));
    alert("Perfil actualizado correctamente.");
}

// Cargar citas generales con ejemplos
function cargarCitasParaFuncionario() {
    const lista = document.getElementById("listaCitasFuncionario");
    lista.innerHTML = "";

    let citas = JSON.parse(localStorage.getItem("citasGenerales")) || [];

    // Si no hay citas, insertar ejemplos
    if (citas.length === 0) {
        citas = [
            { estudiante: "Juan Pérez", tipoServicio: "Medicina General", fecha: "2025-06-15", hora: "10:00" },
            { estudiante: "Ana Gómez", tipoServicio: "Consulta Médica", fecha: "2025-06-18", hora: "12:30" },
            { estudiante: "Josue Reyes", tipoServicio: "Consulta Médica", fecha: "2025-06-18", hora: "12:30" },
            { estudiante: "Marlon Alvia", tipoServicio: "Medicina General", fecha: "2025-06-18", hora: "12:30" },
            { estudiante: "Cristopher Castro", tipoServicio: "Consulta Médica", fecha: "2025-06-18", hora: "12:30" },
            { estudiante: "Johan Suarez", tipoServicio: "Consulta Médica", fecha: "2025-06-20", hora: "09:00" }
        ];
        localStorage.setItem("citasGenerales", JSON.stringify(citas));
    }

    citas.forEach((cita, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${cita.estudiante} - ${cita.tipoServicio} - ${cita.fecha} ${cita.hora}
            <button onclick="cambiarFecha(${index})">Cambiar Fecha</button>
            <button onclick="atenderCita(${index})">Atender</button>
            <button onclick="cancelarCita(${index})">Cancelar</button>
        `;
        lista.appendChild(li);
    });
}

// Cambiar fecha de cita
function cambiarFecha(index) {
    const citas = JSON.parse(localStorage.getItem("citasGenerales")) || [];
    const nuevaFecha = prompt("Nueva fecha (YYYY-MM-DD):");
    const nuevaHora = prompt("Nueva hora (HH:MM):");

    if (nuevaFecha && nuevaHora) {
        citas[index].fecha = nuevaFecha;
        citas[index].hora = nuevaHora;
        localStorage.setItem("citasGenerales", JSON.stringify(citas));
        cargarCitasParaFuncionario();
        alert("Cita actualizada.");
    }
}

// Atender cita
function atenderCita(index) {
    const emailFuncionario = localStorage.getItem("usuarioActivo");
    const citas = JSON.parse(localStorage.getItem("citasGenerales")) || [];
    const historial = JSON.parse(localStorage.getItem("historial_" + emailFuncionario)) || [];

    const citaAtendida = citas.splice(index, 1)[0];
    historial.push(citaAtendida);

    localStorage.setItem("citasGenerales", JSON.stringify(citas));
    localStorage.setItem("historial_" + emailFuncionario, JSON.stringify(historial));

    cargarCitasParaFuncionario();
    cargarHistorialFuncionario();
}

// Cancelar cita
function cancelarCita(index) {
    const citas = JSON.parse(localStorage.getItem("citasGenerales")) || [];

    if (confirm("¿Seguro de cancelar esta cita?")) {
        citas.splice(index, 1);
        localStorage.setItem("citasGenerales", JSON.stringify(citas));
        cargarCitasParaFuncionario();
    }
}

// Cargar historial de citas atendidas con ejemplos
function cargarHistorialFuncionario() {
    const emailFuncionario = localStorage.getItem("usuarioActivo");
    let historial = JSON.parse(localStorage.getItem("historial_" + emailFuncionario)) || [];

    // Si no hay historial, insertar ejemplos
    if (historial.length === 0) {
        historial = [
            { estudiante: "Carlos Ruiz", tipoServicio: "Odontología", fecha: "2025-05-20", hora: "14:00" },
            { estudiante: "María López", tipoServicio: "Exámenes Médicos", fecha: "2025-05-22", hora: "11:30" }
        ];
        localStorage.setItem("historial_" + emailFuncionario, JSON.stringify(historial));
    }

    const lista = document.getElementById("historialFuncionario");
    lista.innerHTML = "";

    historial.forEach(cita => {
        const li = document.createElement("li");
        li.textContent = `${cita.estudiante} - ${cita.tipoServicio} - ${cita.fecha} ${cita.hora}`;
        lista.appendChild(li);
    });
}
