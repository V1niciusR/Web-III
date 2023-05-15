const fs = require('fs');

try {
    /* Código que pode lançar um erro */
    /* Lê o conteúdo do arquivo file.txt, não existe */
    const data = fs.readFileSync('file.txt', 'utf8');
    console.log(data); /* Imprime o conteúdo do arquivo */
}

catch (err) {
    console.error(err); /* Imprime o erro no console */
}

finally {
    /* Código que executa depois do try ou catch */
    console.log('Fim do exemplo');
}