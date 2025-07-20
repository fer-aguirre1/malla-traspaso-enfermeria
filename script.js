const estado = JSON.parse(localStorage.getItem("estadoMalla") || "{}");

function actualizar() {
  document.querySelectorAll(".ramo").forEach(btn => {
    const id = btn.dataset.id;

    if (estado[id]) {
      btn.classList.add("approved");
    }

    btn.addEventListener("click", () => {
      if (btn.classList.contains("locked")) return;

      btn.classList.toggle("approved");
      estado[id] = btn.classList.contains("approved");
      localStorage.setItem("estadoMalla", JSON.stringify(estado));
    });
  });
}

actualizar();
