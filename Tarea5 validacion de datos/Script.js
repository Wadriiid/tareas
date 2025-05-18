document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", function(event) {
    let errores = [];

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

    // Validar nombre
    if (nombre.length < 2) {
      errores.push("El nombre debe tener al menos 2 caracteres.");
    }

    // Validar apellido
    if (apellido.length < 2) {
      errores.push("El apellido debe tener al menos 2 caracteres.");
    }

    // Validar correo (debe terminar en .com, .es u otra extensión con punto)
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    if (!regexCorreo.test(email)) {
      errores.push("El correo debe ser válido y terminar en un dominio como .com, .es, .net, etc.");
    }

    // Validar teléfono con 10 dígitos exactos
    const regexTelefono = /^\d{10}$/;
    if (!regexTelefono.test(telefono)) {
      errores.push("El teléfono debe contener exactamente 10 números.");
    }

    // Validar dirección
    if (direccion.length < 5) {
      errores.push("La dirección debe tener al menos 5 caracteres.");
    }

    if (errores.length > 0) {
      event.preventDefault();
      alert("Errores:\n" + errores.join("\n"));
    } else {
      event.preventDefault(); // Evitamos envío real si no hay backend
      alert("✅ Registro listo.");
      formulario.reset(); // Opcional: limpia el formulario después del éxito
    }
  });
});
