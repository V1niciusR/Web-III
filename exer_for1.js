/* Ler um número e imprir a tabuada de um a 10 deste número */

/* Vamos usar o pacote prompt-sync para ler a partir do terminal, caso não seja instalado instale com "npm i prompt-sync" no seu terminal */

/* Importando prompt-sync */
const prompt=require("prompt-sync")();
const numero = prompt("Digite um número: ");
console.log("Calculando a tabuada...");