const naturalidades = {
    Brasil: [
        "Paulista", "Carioca", "Mineiro(a)", "Baiano(a)", "Pernambucano(a)", "Gaúcho(a)", "Outra Cidade Brasileira"
    ],
    Portugal: [
        "Lisboeta", "Portuense", "Algarvio(a)", "Açoriano(a)", "Madeirense", "Outra Cidade Portuguesa"
    ],
    Outra: [
        "Naturalidade Estrangeira"
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    const nacionalidadeSelect = document.getElementById("nacionalidade");
    const naturalidadeSelect = document.getElementById("naturalidade");

    function loadNaturalidades() {
        const nacionalidade = nacionalidadeSelect.value;

        naturalidadeSelect.innerHTML = '<option value="" disabled selected>Selecione a Naturalidade</option>';
        naturalidadeSelect.disabled = true;

        if (naturalidades[nacionalidade]) {
            naturalidadeSelect.disabled = false;
            naturalidades[nacionalidade].forEach(nat => {
                const option = document.createElement("option");
                option.value = nat;
                option.textContent = nat;
                naturalidadeSelect.appendChild(option);
            });
        }
    }
    nacionalidadeSelect.addEventListener("change", loadNaturalidades);

    window.navigateSection = function (currentSectionId, nextSectionId) {
        const currentSection = document.getElementById(currentSectionId);
        const nextSection = document.getElementById(nextSectionId);

        if (currentSection) {
            currentSection.style.display = 'none';
        }
        if (nextSection) {
            nextSection.style.display = 'block';
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    window.clearSection = function (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const inputs = section.querySelectorAll('input, select');
            inputs.forEach(input => {
                if (input.tagName === 'SELECT') {
                    input.selectedIndex = 0;
                    if (input.id === 'naturalidade') {
                        input.disabled = true;
                        input.innerHTML = '<option value="" disabled selected>Selecione primeiro a Nacionalidade</option>';
                    }
                } else {
                    input.value = '';
                }
            });
        }
    };
   const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    submit();           
});
});

window.submit = function () {
    alert("Muito Obrigado por escolher o Senai\nEm breve entraremos em contato, até logo :)");
    window.location.href = "https://www.pe.senai.br/";
};
