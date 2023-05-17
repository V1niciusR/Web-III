//para instalar pacotes do npm para alguma funcionalidade já existente 
//abrir novo terminal/new terminal
//digitar no terminal os comandos...
//npm isntall (nomedopacote)

//Neste caso vamos instalar um pacote para capturar dados no terminal e pode utilizar estes dados em variáveis 
//Abra um terminal e digite o seguinte comando...
//npm install prompt-sync

//Require para importar o pacote inteiro de funcionalidades

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


console.log('-------------------------------------------------');
const prompt=require('prompt-sync')();
console.log('Bem-vindo á calculadora em Nodejs');
console.log('Escolha a opção desejada:');
console.log('1-Soma');
console.log('2-Subtração');
console.log('3-Multiplicação');
console.log('4-Divisão');
console.log('-------------------------------------------------');
const escolha=prompt('');
console.log('Digite o primeiro número: ');
const num1=prompt('');
console.log('Digite o segundo número: ');
const num2=prompt('');
const n1=Number(num1);
const n2=Number(num2);

if (escolha==="1"){
    console.log(n1 + n2);
}

else if (escolha==="2"){
    console.log(n1-n2);
}

else if (escolha==="3"){
    console.log(n1*n2);
}

else if (escolha==="4"){
    console.log(n1/n2);
}

else {
    console.log('Digite um valor correto entre 1 e 4')
}