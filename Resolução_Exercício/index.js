const mysql = require('mysql2');

try {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'escola'
    });

    /*------------------------------------------------------ funções disponíveis ------------------------------------------------------*/

    // Inserindo alunos na tabela
    InserirAluno('', ); // Preencha com os valores adequados

    // Apagando um aluno por ID
    ApagarAluno(); // Descomente esta linha para testar a função de apagar

    // Retornar um aluno por ID
    RetornarAlunoPorId(); // Altere o ID conforme necessário

    /*------------------------------------------------------ //funções disponíveis ------------------------------------------------------*/

    // Listar todos os alunos
    ListarTodosAlunos();

    // Listar alunos com idade menor que 14 anos
    ListarAlunosMenor14();

    // Listar alunos com idade entre 14 e 18 anos
    ListarAlunosEntre14e18();

    connection.end(); // Fechar a conexão após todas as operações
}
catch (error) {
    console.error(error.message);
}

function InserirAluno(Nome, Idade) {
    const query = `
        INSERT INTO Aluno (Nome, Idade)
        VALUES (?, ?)
    `;

    connection.query(query, [Nome, Idade], (err, results) => {
        if (err)
            throw new Error("Problema na inserção");
        else
            console.log("Registro inserido");
    });
}

function ApagarAluno(idAluno) {
    const query = `
        DELETE FROM aluno
        WHERE aluno.id = ?
    `;

    connection.query(query, [idAluno], (err, results) => {
        if (err)
            throw new Error("Problema ao apagar registro");
        else
            console.log("Registro cancelado");
    });
}

function Atualizar(id, nome) {
    connection.query(
        "UPDATE aluno SET nome = ? WHERE aluno.id = ?",
        [nome, id],
        function (err, results) {
            if (err)
                throw new Error("Problema ao atualizar");
            else
                console.log("Item atualizado com sucesso");
        });
}

function ListarTodosAlunos() {
    connection.query(
        "SELECT * FROM aluno",
        function (err, results) {
            if (err)
                throw new Error("Problema ao listar todos os alunos");
            else if (results.length === 0)
                throw new Error("Tabela vazia");
            else
                console.log("Todos os alunos:");
            console.log(results);
        });
}

function ListarAlunosMenor14() {
    connection.query(
        "SELECT * FROM aluno WHERE idade < 14",
        function (err, results) {
            if (err)
                throw new Error("Problema ao listar alunos com idade menor que 14 anos");
            else if (results.length === 0)
                throw new Error("Nenhum aluno com idade menor que 14 anos encontrado");
            else
                console.log("Alunos com idade menor que 14 anos:");
            console.log(results);
        });
}

function ListarAlunosEntre14e18() {
    connection.query(
        "SELECT * FROM aluno WHERE idade BETWEEN 14 AND 18",
        function (err, results) {
            if (err)
                throw new Error("Problema ao listar alunos com idade entre 14 e 18 anos");
            else if (results.length === 0)
                throw new Error("Nenhum aluno com idade entre 14 e 18 anos encontrado");
            else
                console.log("Alunos com idade entre 14 e 18 anos:");
            console.log(results);
        });
}

function RetornarAlunoPorId(id) {
    connection.query(
        "SELECT * FROM aluno WHERE id = ?",
        [id],
        function (err, results) {
            if (err)
                throw new Error("Problema ao retornar aluno por ID");
            else if (results.length === 0)
                throw new Error("Nenhum aluno com o ID especificado encontrado");
            else
                console.log("Aluno com o ID especificado:");
            console.log(results[0]);
        });
}
function Inserir(Nome, Idade) {
    connection.query(
        'INSERT INTO Aluno (Nome, Idade) VALUES (?, ?)',
        [Nome, Idade],
        function (err, results) {
            if (err)
                throw new Error("Problema na inserção");
            else
                console.log("Registro inserido");
        });
}

function Apagar(idAluno) {
    connection.query(
        "DELETE FROM aluno WHERE aluno.id = ?",
        [idAluno],
        function (err, results) {
            if (err)
                throw new Error("Problema ao apagar registro");
            else
                console.log("Registro cancelado");
        });
}

function Atualizar(id, nome) {
    connection.query(
        "UPDATE aluno SET nome = ? WHERE aluno.id = ?",
        [nome, id],
        function (err, results) {
            if (err)
                throw new Error("Problema ao atualizar");
            else
                console.log("Item atualizado com sucesso");
        });
}

function ListarTodosAlunos() {
    connection.query(
        "SELECT * FROM aluno",
        function (err, results) {
            if (err)
                throw new Error("Problema ao listar todos os alunos");
            else if (results.length === 0)
                throw new Error("Tabela vazia");
            else
                console.log("Todos os alunos:");
            console.log(results);
        });
}

function ListarAlunosMenor14() {
    connection.query(
        "SELECT * FROM aluno WHERE idade < 14",
        function (err, results) {
            if (err)
                throw new Error("Problema ao listar alunos com idade menor que 14 anos");
            else if (results.length === 0)
                throw new Error("Nenhum aluno com idade menor que 14 anos encontrado");
            else
                console.log("Alunos com idade menor que 14 anos:");
            console.log(results);
        });
}

function ListarAlunosEntre14e18() {
    connection.query(
        "SELECT * FROM aluno WHERE idade BETWEEN 14 AND 18",
        function (err, results) {
            if (err)
                throw new Error("Problema ao listar alunos com idade entre 14 e 18 anos");
            else if (results.length === 0)
                throw new Error("Nenhum aluno com idade entre 14 e 18 anos encontrado");
            else
                console.log("Alunos com idade entre 14 e 18 anos:");
            console.log(results);
        });
}

function RetornarAlunoPorId(id) {
    connection.query(
        "SELECT * FROM aluno WHERE id = ?",
        [id],
        function (err, results) {
            if (err)
                throw new Error("Problema ao retornar aluno por ID");
            else if (results.length === 0)
                throw new Error("Nenhum aluno com o ID especificado encontrado");
            else
                console.log("Aluno com o ID especificado:");
            console.log(results[0]);
        });
}