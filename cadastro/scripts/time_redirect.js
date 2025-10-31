const counterElem = document.getElementById("time");
let counter = parseInt(counterElem.textContent);

const interval = setInterval(() => {
  if (counter > 0) {
    counter--;
    counterElem.textContent = counter;
  } else {
    clearInterval(interval);          
    window.location.href = "https://sge.pe.senai.br/framehtml/Web/App/Edu/PortalEducacional/login/";
  }
}, 1000);