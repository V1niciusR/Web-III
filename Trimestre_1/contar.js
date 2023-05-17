const prompt=require('prompt-sync')();
// Objetivo:
/* Pedir ao usuário um número inteiro e imprimir todos os números de 0 até o número */

const numeros=prompt("Digite um número: ");
for(let i=0; i <= numeros; i++)
{
    console.log(i);
}