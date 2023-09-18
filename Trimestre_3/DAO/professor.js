const mysql = require('mysql2');

let connection;

try {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'professor01'
    });
} catch (error) {
    error.stack = '';
    console.error(error.message);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove todos os caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        throw new Error('CPF inválido: O CPF deve conter 11 dígitos distintos.');
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    const resto = soma % 11;
    let digitoVerificador1 = 11 - resto;
    if (digitoVerificador1 > 9) {
        digitoVerificador1 = 0;
    }
    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
        throw new Error('CPF inválido: Dígito verificador 1 não corresponde.');
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    const resto2 = soma % 11;
    let digitoVerificador2 = 11 - resto2;
    if (digitoVerificador2 > 9) {
        digitoVerificador2 = 0;
    }
    if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
        throw new Error('CPF inválido: Dígito verificador 2 não corresponde.');
    }
}

function Inserir(cpf, nome, titulacao, callback) {
    console.log('CPF recebido:', cpf);
    try {
        validarCPF(cpf);
        connection.query(
            'INSERT INTO professor (cpf, nome, titulacao) VALUES (?, ?, ?)',
            [cpf, nome, titulacao],
            function (err, results) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, results.affectedRows);
                }
            }
        );
    } catch (error) {
        callback(error, null);
    }
}

function ListarTodosProfessores(callback) {
    connection.query(
        'SELECT * FROM professor',
        function (err, results) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        }
    );
}

function Apagar(idProfessor, callback) {
    connection.query(
        'DELETE FROM professor WHERE id = ?',
        [idProfessor],
        function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        }
    );
}

function Atualizar(idProfessor, novoNome, callback) {
    connection.query(
        'UPDATE professor SET nome = ? WHERE id = ?',
        [novoNome, idProfessor],
        function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        }
    );
}

module.exports = { Inserir, ListarTodosProfessores, Apagar, Atualizar, validarCPF };

