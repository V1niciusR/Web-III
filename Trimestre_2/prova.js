const mysql = require('mysql2')
let connection;

try {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'vinicius'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.message);
      return;
    }
    console.log('Conexão estabelecida com sucesso!');
  });
} catch (error) {
  error.stack = 'Erro na conexão com o banco de dados!';
  console.error(error.message);
}

/* INSERIR E APAGAR DADOS */

Atualizar(4, "João");


/* /INSERIR E APAGAR DADOS */

function Inserir(Nome) {
  connection.query(
    'INSERT INTO amigos_vinicius (Nome) VALUES (?)',
    [Nome],
    function (err, results) {
      if (err) {
        throw new Error("Problema na inserção.");
      } else {
        console.log("Registro inserido com sucesso.");
      }
    }
  );
}

function Apagar(id) {
  connection.query(
    'DELETE FROM amigos_vinicius WHERE id = ?',
    [id],
    function (err, results) {
      if (err) {
        throw new Error("Problema na remoção.");
      } else {
        console.log("Registro removido com sucesso.");
      }
    }
  );
}

function Atualizar(id, Nome) {
  connection.query(
    'UPDATE amigos_vinicius SET Nome = ? WHERE id = ?',
    [Nome, id],
    function (err, results) {
      if (err) {
        throw new Error("Problema na atualização.");
      } else {
        console.log("Registro atualizado com sucesso.");
      }
    }
  );
}