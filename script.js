document.getElementById("anonimo").addEventListener("change", function () {
  const mostrar = this.value === "no";
  document.getElementById("datosPersonales").style.display = mostrar ? "block" : "none";
});

document.getElementById("formDenuncia").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const denuncia = {
    anonimo: formData.get("anonimo"),
    nombre: formData.get("nombre") || null,
    correo: formData.get("correo") || null,
    descripcion: formData.get("descripcion"),
    fechaIncidente: formData.get("fechaIncidente") || null,
    personaImplicada: formData.get("personaImplicada") || null,
    fechaEnvio: new Date().toISOString(),
    folio: generarFolio(),
    estatus: "Recibida",
    historial: [
      {
        fecha: new Date().toISOString(),
        estatus: "Recibida",
        nota: "Denuncia registrada automáticamente"
      }
    ]
  };

  guardarDenuncia(denuncia);

  document.getElementById("formDenuncia").style.display = "none";
  document.getElementById("confirmacion").style.display = "block";
  document.getElementById("folioGenerado").textContent = denuncia.folio;
});

function generarFolio() {
  const now = new Date();
  return `DN-${now.getFullYear()}${now.getMonth()+1}${now.getDate()}-${now.getTime()}`;
}

function guardarDenuncia(denuncia) {
  const existentes = JSON.parse(localStorage.getItem("denuncias") || "[]");
  existentes.push(denuncia);
  localStorage.setItem("denuncias", JSON.stringify(existentes));
}
