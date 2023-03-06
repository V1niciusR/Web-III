/*Leia várias ideias e calcule a média entre as idades*/

/*Ler as idades*/
const prompt = require("prompt-sync")();

/*Prompt retorna uma string, logo precisamos converter para número*/
const numeroIdades=prompt("Quantas idades precisamos ler?");

const listaIdades= new Array(Number(numeroIdades));

let i = 0;
let tamnhoLista = listaIdades.length;
while(i < tamnhoLista){
    let idade = prompt(`Qual a idade núemero ${i}`);
    listaIdades[i]=Number(idade);
    i++;
}