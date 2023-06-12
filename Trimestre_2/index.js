const mysql = require('mysql2')
let connection;

try {
  connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'escola'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.message);
      return;
    }
    console.log('Conexão estabelecida com sucesso!');
  });
} catch (error) {
  error.stack = 'Erro na conexão com o banco de dados';
  console.error(error.message);
}

Inserir('João', 20);

function Inserir(Nome, Idade) {
  connection.query(
    'INSERT INTO aluno (Nome, Idade) VALUES (?, ?)',
    [Nome, Idade],
    function(err, results) {
      if (err) {
        throw new Error("Problema na inserção");
      } else {
        console.log("Registro inserido com sucesso");
      }
    }
  );
}

function Apagar(id) {
  connection.query(
    'DELETE FROM aluno WHERE id = ?',
    [id],
    function(err, results) {
      if (err) {
        throw new Error("Problema na remoção");
      } else {
        console.log("Registro removido com sucesso");
      }
    }
  );
}