//criar um programa para pedir qual é o valor da bolsa desejada e imprimir o valor da bolsa escolhida 
//IC = R$ 300
//Mestrado = R$ 2100
//Doutorado = R$ 3200
//Pós-doc = R$ 5200



console.log('-------------------------------------------------');
const prompt=require('prompt-sync')();
console.log('Bem-vindo as bolsas em Nodejs');
console.log('Escolha a opção desejada:');
console.log('1-IC');
console.log('2-Mestrado');
console.log('3-Doutorado');
console.log('4-Pós-Doc');
console.log('-------------------------------------------------');

const escolha=prompt('');

if (escolha==="1"){
    console.log('Sua bolsa tem o valor de R$ 300');
}

else if (escolha==="2"){
    console.log('Sua bolsa tem o valor de R$ 2.100');
}

else if (escolha==="3"){
    console.log('Sua bolsa tem o valor de R$ 3.200');
}

else if (escolha==="4"){
    console.log('Sua bolsa tem o valo0r de R$ 5.200');
}

else {
    console.log('Digite um valor correto entre 1 e 4')
}