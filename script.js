document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("denunciaForm");
  const mensaje = document.getElementById("mensaje");
  const datosPersona = document.getElementById("datosPersona");

  form.anonimo.addEventListener("change", () => {
    datosPersona.style.display = form.anonimo.value === "no" ? "block" : "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      anonimo: form.anonimo.value,
      nombre: form.anonimo.value === "no" ? form.nombre.value : null,
      correo: form.anonimo.value === "no" ? form.correo.value : null,
      descripcion: form.descripcion.value,
      fechaIncidente: form.fechaIncidente.value,
      personaImplicada: form.personaImplicada.value,
      fechaEnvio: new Date().toISOString(),
      estatus: "Recibida",
      folio: "D" + Date.now(),
      historial: [
        {
          estatus: "Recibida",
          fecha: new Date().toISOString(),
          nota: "Denuncia recibida en el sistema"
        }
      ]
    };

    const existentes = JSON.parse(localStorage.getItem("denuncias") || "[]");
    existentes.push(data);
    localStorage.setItem("denuncias", JSON.stringify(existentes));

    mensaje.textContent = `Gracias. Su denuncia ha sido registrada con el folio ${data.folio}.`;
    mensaje.style.display = "block";
    form.reset();
    datosPersona.style.display = "none";
  });
});
