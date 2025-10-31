const coursesByCity = {
  areias: [
    "Técnico em Desenvolvimentos de Sistemas",
    "Técnico em Logística",
    "Técnico em Informática",
    "Técnico em Eletrotécnica",
    "Técnico em Automação Industrial",
    "Técnico em Redes de Computadores"
  ],
  santo_amaro: [
    "Técnico em Administração",
    "Técnico em Eletromecânica",
    "Mecânico de Manutenção",
    "Mecânico de Usinagem",
    "Eletricista de Manutenção Eletroeletrônica"
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const citySelect = document.getElementById("unit");
  const courseSelect = document.getElementById("course");

  citySelect.addEventListener("change", () => {
    const city = citySelect.value;
    courseSelect.length = 1;

    courseSelect.disabled = false;

    if (coursesByCity[city]) {
      coursesByCity[city].forEach(course => {
        const option = document.createElement("option");
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
      });
    }
  });
});
