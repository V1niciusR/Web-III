const mysql = require('mysql2');

let connection;

try {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'professor_cpf'
  });
} catch (error) {
  error.stack = '';
  console.error(error.message);
}

function validarCPF(cpf) {
    // Remova todos os caracteres não numéricos, exceto números
    cpf = cpf.replace(/[^\d]/g, '');
  
    if (cpf.length !== 11) {
      return 'CPF deve ter 11 dígitos';
    }
  
    // Verifique se todos os dígitos são iguais (situação inválida)
    if (/^(\d)\1+$/.test(cpf)) {
      return 'CPF inválido (todos os dígitos iguais)';
    }
  
    // Calcula o primeiro dígito verificador e o segundo dígito verificador aqui...
  
    // Verifique se os dígitos verificadores são iguais aos dígitos calculados aqui...
  
    // Se tudo estiver correto, retorne null (sem erro)
    return null;
  }
  
  
  function Inserir(cpf, nome, titulacao, callback) {
    if (!validarCPF(cpf)) {
      const error = new Error('CPF inválido');
      return callback(error, null);
    }
  
    connection.query(
      'INSERT INTO Professor (cpf, nome, titulacao) VALUES (?, ?, ?)',
      [cpf, nome, titulacao],
      function (err, results) {
        if (err) {
          return callback(err, null);
        }
        callback(null, results.affectedRows);
      }
    );
  }
  

function ListarTodosProfessores(callback) {
  connection.query('SELECT * FROM Professor', function (err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

function Apagar(idProfessor, callback) {
  connection.query(
    'DELETE FROM Professor WHERE Professor.id = ?',
    [idProfessor],
    function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
}

function Atualizar(id, novoNome, callback) {
  connection.query(
    'UPDATE Professor SET nome = ? WHERE Professor.id = ?',
    [novoNome, id],
    function (err, results) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
}

module.exports = { Inserir, ListarTodosProfessores, Apagar, Atualizar };
