// Requisitos por ramo
const requisitos = {
  "ENF1112": ["MAT1000", "PSI1101"], // Ejemplo: ENF1112 necesita MAT1000 y PSI1101
  "QIM100F": ["MAT1000"],
  // Agrega más ramos con sus requisitos reales aquí
};

// Estado del progreso
const estado = {};

// Cargar estado desde localStorage
if (localStorage.getItem("estadoMalla")) {
  Object.assign(estado, JSON.parse(localStorage.getItem("estadoMalla")));
}

// Inicializar botones
document.querySelectorAll(".ramo").forEach(btn => {
  const id = btn.dataset.id;
  if (estado[id]) {
    btn.classList.add("approved");
  }
  if (!puedeDesbloquear(id)) {
    btn.classList.add("locked");
  }

  btn.addEventListener("click", () => {
    if (btn.classList.contains("locked")) return;

    btn.classList.toggle("approved");
    estado[id] = btn.classList.contains("approved");
    localStorage.setItem("estadoMalla", JSON.stringify(estado));

    actualizarBloqueos();
  });
});

function puedeDesbloquear(id) {
  const reqs = requisitos[id];
  if (!reqs) return true;
  return reqs.every(r => estado[r]);
}

function actualizarBloqueos() {
  document.querySelectorAll(".ramo").forEach(btn => {
    const id = btn.dataset.id;
    if (!btn.classList.contains("approved")) {
      if (puedeDesbloquear(id)) {
        btn.classList.remove("locked");
      } else {
        btn.classList.add("locked");
      }
    }
  });
}

