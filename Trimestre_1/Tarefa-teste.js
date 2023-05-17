const prompt = require('prompt-sync')(); // Importa a biblioteca prompt-sync

const numeroContatos = prompt("Quantos contatos você quer cadastrar? ");

//Alterado
let listaContatos = [];
let indice = 0;

//Alterado
let tamanhoLista = Number(numeroContatos);

while(indice < tamanhoLista) {
    let contato = {};
    let nome = prompt("Digite o nome: ");
    let numero = prompt("Digite o número: ");
    contato.nome = nome;
    contato.numero = numero;
    listaContatos.push(contato);
    indice++
}

console.log (listaContatos);

let pesquisa = prompt("Digite o nome que você quer saber o contato: ");
let encontrado = false;

for(let i=0; i<listaContatos.length; i++){
    if(pesquisa === listaContatos[i].nome){
        console.log(`O número de contato de ${pesquisa} é ${listaContatos[i].numero}`);
        encontrado = true;
        break;
    }
}

if(!encontrado){
    console.log(`O nome ${pesquisa} não foi encontrado na lista de contatos`);
}
