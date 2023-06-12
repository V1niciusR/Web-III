const mysql = require('mysql2/promise')
let connection;

try {
  connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'escola'
  });
}

  catch(error){
    error.stack=" ";
    console.error(error.message);
  }

function Inserir(Nome, Idade){
  connection.query(
    'INSERT INTO aluno (Nome, Idade) VALUES (?, ?)',
    [Nome, Idade],
    function(err, results) {
      if (err)
      throw new Error("Problema na inserção");
      else
      console.log("Registro inserido com sucesso");
    }
  );
}