function cargarPerfil() {
    const emailActivo = localStorage.getItem("usuarioActivo");
    if (!emailActivo) {
        alert("No has iniciado sesión.");
        window.location.href = "login.html";
        return;
    }

    const user = JSON.parse(localStorage.getItem(emailActivo));

    document.getElementById("nombrePerfil").value = user.fullname;
    document.getElementById("emailPerfil").textContent = user.email;D
    document.getElementById("telefonoPerfil").value = user.phone;
    document.getElementById("cedulaPerfil").value = user.idnumber;

    if (user.foto) {
        document.getElementById("imagenPerfil").src = user.foto;
    }
}

// Mostrar solo la sección seleccionada
function mostrarSeccion(seccionId) {
    const secciones = document.getElementsByClassName("seccion");
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].style.display = "none";
    }
    document.getElementById(seccionId).style.display = "block";
}

// Guardar cita agendada
document.addEventListener("DOMContentLoaded", () => {
    cargarPerfil();

    const formCita = document.getElementById("formCita");
    if (formCita) {
        formCita.addEventListener("submit", function (e) {
            e.preventDefault();

            const tipoServicio = document.getElementById("tipoServicio").value;
            const fecha = document.getElementById("fechaCita").value;
            const hora = document.getElementById("horaCita").value;

            if (!fecha || !hora) {
                alert("Debes seleccionar una fecha y hora.");
                return;
            }

            const emailActivo = localStorage.getItem("usuarioActivo");
            let citas = JSON.parse(localStorage.getItem("citas_" + emailActivo)) || [];

            const nuevaCita = {
                tipoServicio,
                fecha,
                hora
            };

            citas.push(nuevaCita);
            localStorage.setItem("citas_" + emailActivo, JSON.stringify(citas));

            alert("Cita agendada con éxito.");
            mostrarSeccion("citas");
            mostrarCitas();
        });
    }

    mostrarCitas();

    // Guardar cambios de perfil
    document.getElementById("guardarPerfil").addEventListener("click", () => {
        const emailActivo = localStorage.getItem("usuarioActivo");
        const user = JSON.parse(localStorage.getItem(emailActivo));

        user.fullname = document.getElementById("nombrePerfil").value;
        user.phone = document.getElementById("telefonoPerfil").value;
        user.idnumber = document.getElementById("cedulaPerfil").value;

        localStorage.setItem(emailActivo, JSON.stringify(user));
        alert("Perfil actualizado correctamente.");
    });

    // Subir imagen de perfil
    document.getElementById("subirImagen").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const base64 = event.target.result;
                document.getElementById("imagenPerfil").src = base64;

                const emailActivo = localStorage.getItem("usuarioActivo");
                const user = JSON.parse(localStorage.getItem(emailActivo));
                user.foto = base64;
                localStorage.setItem(emailActivo, JSON.stringify(user));
            };
            reader.readAsDataURL(file);
        }
    });

    // Cerrar sesión
    document.getElementById("cerrarSesion").addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "login.html";
    });
});

function mostrarCitas() {
    const emailActivo = localStorage.getItem("usuarioActivo");
    let citas = JSON.parse(localStorage.getItem("citas_" + emailActivo)) || [];

    const listaCitas = document.getElementById("listaCitas");
    if (listaCitas) {
        listaCitas.innerHTML = "";

        const hoy = new Date().toISOString().split("T")[0];

        citas.forEach(cita => {
            if (cita.fecha >= hoy) {
                const li = document.createElement("li");
                li.textContent = `${cita.tipoServicio} - ${cita.fecha} a las ${cita.hora}`;
                listaCitas.appendChild(li);
            }
        });
    }

    mostrarHistorial();
}

function mostrarHistorial() {
    const emailActivo = localStorage.getItem("usuarioActivo");
    let citas = JSON.parse(localStorage.getItem("citas_" + emailActivo)) || [];

    const listaHistorial = document.getElementById("listaHistorial");
    if (listaHistorial) {
        listaHistorial.innerHTML = "";

        const hoy = new Date().toISOString().split("T")[0];

        citas.forEach(cita => {
            if (cita.fecha < hoy) {
                const li = document.createElement("li");
                li.textContent = `${cita.tipoServicio} - ${cita.fecha} a las ${cita.hora}`;
                listaHistorial.appendChild(li);
            }
        });
    }
}
