document.getElementById('clienteForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const cedula = document.getElementById('cedula').value;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const fecha = document.getElementById('fecha').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const direccion = document.getElementById('direccion').value;

  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `
    <h3>Datos Ingresados:</h3>
    <p><strong>Cédula:</strong> ${cedula}</p>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Apellido:</strong> ${apellido}</p>
    <p><strong>Fecha de Nacimiento:</strong> ${fecha}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${telefono}</p>
    <p><strong>Dirección:</strong> ${direccion}</p>
  `;

  document.getElementById('modal').style.display = 'block';
});

document.getElementById('cerrarModal').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'none';
});
