const nomedoMes = function(mes) {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'nNovembro', 'Dezembro'];
    if (meses[mes] !== undefined) {
        return meses[mes];
    } 
    else {
        throw new Error('Mês inválido'); /* Dispara erro */
    }
}

try {
    /* Código que pode lançar um erro */
    console.log(nomedoMes(4)); /* Lança um erro */
}

catch (err) {
    /* Código que executa se um erro for lançado */
    console.error(err); /* Imprime o erro no console */
}

finally {
    /* Código que executa depois do try ou catch */
    console.log('Fim do exemplo'); /* Imprime uma mensagem de erro */
}