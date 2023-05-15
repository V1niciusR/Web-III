/*
const mysql = require('mysql2/promise')

// Crie uma conexão com o banco de dados MySQL
// create the connection to database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'vinicius'
    });

// Tente se conectar ao banco de dados MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados MySQL: ', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL com sucesso!');
});
*/


const mysql = require('mysql2/promise')

// Crie uma conexão com o banco de dados MySQL
// create the connection to database
try {
  const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'vinicius'
  });
  console.log('Conexão com o banco de dados estabelecida!')
} catch (error) {
  console.log(`Não foi possível estabelecer conexão com o banco de dados. Erro: ${error}`)
}

