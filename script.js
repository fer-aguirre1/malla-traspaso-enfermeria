// Requisitos por ramo (IDs deben coincidir con los del HTML)
const requisitos = {
  // ENF1112 se abre libremente, pero otros dependen de ella
  "BIO136E": ["QIM100F"],
  "ENF1205": ["MED841"],
  "ENF1212": ["ENF1112"],
  "ENF2112": ["ENF1205", "ENF1212", "ENF1127"],
  "BIO146E": ["BIO136E"],
  "BIO126E": ["BIO136E"],
  "ENF1133": ["ENF1127"],
  "MED839": ["BIO146E", "BIO126E"],
  "MED840": ["BIO146E", "BIO126E"],
  "ENF2208": ["ENF1205", "ENF1212", "ENF1112", "ENF1127"],
  "ENF2215": ["ENF2208"],
  "ENF2220": ["ENF2208"],
  "ENF2315": ["ENF2112", "MED839", "MED840"],
  "ENF2305": ["ENF2112", "ENF2208"],
  "ENF2325": ["ENF2112", "ENF2208"],
  "ENF2322": ["ENF2112", "ENF2208"],
  "ENF2410": ["ENF2325", "ENF2322", "ENF2305", "ENF2315"],
  "ENF2416": ["ENF2325", "ENF2322", "ENF2305", "ENF2315"],
  "ENF2408": ["ENF2322", "ENF1133"],
  "ENF2420": ["ENF2325"],
  "ENF2428": ["ENF2215"],
  "ENF2425": ["ENF2220", "ENF2322"],
  "ENF2510": ["ENF2410", "ENF2416", "ENF2408", "ENF2420", "ENF2425"],
  "ENF2518": ["ENF2410", "ENF2416", "ENF2408", "ENF2420", "ENF2425"],
  "ENF2515": ["ENF2410", "ENF2416", "ENF2408", "ENF2420", "ENF2425"],
  "ENF2530": ["ENF2410", "ENF2416", "ENF2408", "ENF2420", "ENF2425"],
};

// Créditos por ramo
const creditos = {
  "MAT1000": 10, "SOL100": 10, "EAE105A": 10, "PSI1101": 10, "AFG1": 10,
  "OPT2": 5, "SOL312": 10, "ENF1112": 5, "QIM100F": 10, "AFG2": 10, "FILOS": 10,
  "HISTMIN": 10, "ENF1127": 10, "ENF1124": 10, "MED841": 10, "TEO": 10,
  "ENF1205": 10, "ENF1212": 10, "BIO136E": 10, "EYP1087": 10, "ART": 10,
  "BIO146E": 10, "BIO126E": 10, "ENF2112": 15, "ENF2115": 5, "ENF1133": 5,
  "MED839": 10, "MED840": 10, "ENF2208": 15, "ENF2215": 5, "ENF2220": 5,
  "ENF2315": 20, "ENF2305": 10, "ENF2325": 20, "ENF2322": 10, "OPT8": 10,
  "ENF2410": 20, "ENF2416": 10, "ENF2408": 10, "ENF2420": 20,
  "ENF2428": 5, "ENF2425": 10, "OPT10": 10,
  "ENF2510": 25, "ENF2518": 25, "ENF2515": 25, "ENF2530": 25
};

const estado = JSON.parse(localStorage.getItem("estadoMalla") || "{}");

function calcularCreditos() {
  return Object.entries(estado)
    .filter(([_, aprobado]) => aprobado)
    .reduce((acc, [id]) => acc + (creditos[id] || 0), 0);
}

function puedeDesbloquear(id) {
  const reqs = requisitos[id];
  if (!reqs) return true;

  const tieneCreditos = (["BIO146E", "BIO126E", "ENF2112", "ENF2115", "ENF1133"].includes(id))
    ? calcularCreditos() >= 200
    : true;

  return reqs.every(r => estado[r]) && tieneCreditos;
}

function actualizarBotones() {
  document.querySelectorAll(".ramo").forEach(btn => {
    const id = btn.dataset.id;

    if (estado[id]) {
      btn.classList.add("approved");
      btn.classList.remove("locked");
    } else if (puedeDesbloquear(id)) {
      btn.classList.remove("locked");
    } else {
      btn.classList.add("locked");
    }
  });
}

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
    actualizarBotones();
  });
});

actualizarBotones();
