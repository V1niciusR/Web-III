/* Leia várias ideias e calcule a média entre as idades */

/* Ler as idades */
const prompt = require("prompt-sync")();

/* Prompt retorna uma string, logo precisamos converter para número */
const numeroIdades=prompt("Quantas idades precisamos ler?");

const listaIdades= new Array(Number(numeroIdades));

let i = 0;
let tL = listaIdades.length;
while(i < tL){
    let idade = prompt(`Qual a idade núemero ${i}`);
    listaIdades[i]=Number(idade);
    i++;
}

/* Cálculo média aritmética */
/* Já tenho um índice, vamos reutilizar a variável e zerar ela */
i = 0;
while(i < tL){
    let somaItemLista = 0;
    somaItemLista = somaItemLista + listaIdades[indice]; 
}