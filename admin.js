// Protección de acceso
if (localStorage.getItem("adminLogueado") !== "true") {
  alert("Acceso restringido. Debes iniciar sesión.");
  window.location.href = "login.html";
}

// Logout
function logout() {
  localStorage.removeItem("adminLogueado");
  window.location.href = "login.html";
}

const lista = document.getElementById("listaDenuncias");
const denuncias = JSON.parse(localStorage.getItem("denuncias") || "[]");

if (denuncias.length === 0) {
  lista.innerHTML = "<p>No hay denuncias registradas.</p>";
} else {
  denuncias.forEach((denuncia, index) => {
    const card = document.createElement("div");
    card.classList.add("denuncia");

    card.innerHTML = `
      <h3>Folio: ${denuncia.folio}</h3>
      <p><strong>Estado:</strong> ${denuncia.estatus}</p>
      <p><strong>Fecha de envío:</strong> ${new Date(denuncia.fechaEnvio).toLocaleString()}</p>
      ${denuncia.anonimo === "si" ? "<p><em>Denuncia anónima</em></p>" : `
        <p><strong>Nombre:</strong> ${denuncia.nombre}</p>
        <p><strong>Correo:</strong> ${denuncia.correo}</p>
      `}
      <p><strong>Descripción:</strong> ${denuncia.descripcion}</p>
      <p><strong>Fecha del incidente:</strong> ${denuncia.fechaIncidente || "No especificada"}</p>
      <p><strong>Persona implicada:</strong> ${denuncia.personaImplicada || "No especificada"}</p>

      <label><strong>Cambiar estatus:</strong></label>
      <select data-index="${index}" class="cambiar-estado">
        <option value="Recibida" ${denuncia.estatus === "Recibida" ? "selected" : ""}>Recibida</option>
        <option value="En revisión" ${denuncia.estatus === "En revisión" ? "selected" : ""}>En revisión</option>
        <option value="Revisada" ${denuncia.estatus === "Revisada" ? "selected" : ""}>Revisada</option>
      </select>

      <details>
        <summary>Ver historial de cambios</summary>
        <ul>
          ${denuncia.historial.map(h => `
            <li><strong>${h.estatus}</strong> - ${new Date(h.fecha).toLocaleString()}<br><em>${h.nota}</em></li>
          `).join("")}
        </ul>
      </details>

      <hr />
    `;

    lista.appendChild(card);
  });

  document.querySelectorAll(".cambiar-estado").forEach(select => {
    select.addEventListener("change", function () {
      const index = this.getAttribute("data-index");
      const nuevoEstado = this.value;

      denuncias[index].estatus = nuevoEstado;
      denuncias[index].historial.push({
        fecha: new Date().toISOString(),
        estatus: nuevoEstado,
        nota: "Cambio manual desde el panel"
      });

      localStorage.setItem("denuncias", JSON.stringify(denuncias));
      alert("Estatus actualizado");
      location.reload();
    });
  });
}

