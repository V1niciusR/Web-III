const prompt = require('prompt-sync')();

let idade_cibele = parseInt(prompt("Digite a idade 1: "));
let idade_celeste = parseInt(prompt("Digite a idade 2: "));
let idade_camila = parseInt(prompt("Digite a idade 3: "));

let idade_de_camila;

// Determinar a idade de Camila
if (idade_cibele <= idade_celeste) {
  if (idade_camila <= idade_cibele) {
    idade_de_camila = idade_cibele;
  } else if (idade_camila >= idade_celeste) {
    idade_de_camila = idade_celeste;
  } else {
    idade_de_camila = idade_camila;
  }
} else {
  if (idade_camila <= idade_celeste) {
    idade_de_camila = idade_celeste;
  } else if (idade_camila >= idade_cibele) {
    idade_de_camila = idade_cibele;
  } else {
    idade_de_camila = idade_camila;
  }
}

// Imprimir a idade de Camila
console.log("A idade de Camila é:", idade_de_camila);

