//Tratamento de erros e exceções try catch e finally

try {
    //código que pode lançar um erro 
    let x = y + 1; //y não está definido
} catch (err) {
    //código que executo se um erro for lançado
    console.error(err); //imprime o objeto de erro no console
} finally {
    //código que executa depois do try ou catch 
    console.log('Fim do exemplo'); //imprime uma mensagem 
}