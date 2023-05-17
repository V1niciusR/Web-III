/*
JavaScript trabalha com lista de objetos;
Estas listas, a diferença de outras linguagens;
Podem trabalhar com listas de vários tipos diferentes e implementar de várias maneiras;
Estas listas são chamadas de :arrays;
*/

/* Declaração e implementação de arrays */
const listVazia=[]; //não contem elementos 

/* Vamos supor que a gente precise trabalhar com vários objetos */
const aluno1="Felisberto";
const aluno2="Hasdrubal";
const aluno3="Manoel";

/* é mais fácil usar um objeto qe possa manipular todos esses de uma vez só */
const alunos=["Felisberto", "Hasdrubal", "Manoel"];

/*
Cada array pode possuir 0 ou mais elementos;
Posso ter array de vários tipos
*/
const temperaturas=[15.5, 25.2, 38.0, -2.0];

/*O array acima é um conjunto de valores com vírgula*/
const numerodaMegaSena=[12, 30, 35, 50];

/* Array com vários tipos de objetos */
const variosObjetosDiferentes=["Olá", 10, null, true, 25.5, {nome:"Vinícius"}];

/* Trabalhando com elementos */
const carros=["Lamborghini", "Jaguar", "Mercedes", "Audi"];

/* Posso extrair e imprimir elementos específicos usando o indice do elemento */
console.log(`${carros[0]} ${carros[0]}`);
/* 0=Lamborghini, 2=Mercedes */
/* Todo array começa com indice zero */

/* Agora vamos identificar a quantidade de elementos de um array. Como fazer para saber o número de elementos de uma array bem, bem grande? */
const tamanhoArray= carros.length-1;

// .lenght é a propriedade que retorna o tamanho para saber a última posição do array */
const ultimaPos=carros.length-1;

/* Como adiconar mais um elemntos no final dso array com tamanho desconhecido? */
const motos=["Ducati", "Aprilia", "Harley", "Gilera"];
motos.push("Piaggio");

/* Push coloca elemntos na última posição seja qual for o tamanho */

/* 
Agora vamos trabalhar com laços ou interações ou repetições 
Como fazer poaera retpetir uma ação várias vezes?
Use for para um número definido de vezes 
Use while para um número indefinido 
Vamos imprimir a lista de carros, elem por elem
*/
for(let i=0; i < carros.length; i++)
{
    console.log(carros[i]);
}

/* While */
let i=0;
while(1 < carros.length)
{
    console.log(carros[i]);
    i++; /* Incremento de 1 em 1 o indice */
}