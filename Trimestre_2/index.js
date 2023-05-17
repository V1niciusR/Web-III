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

//faça com que peça a usuario datas e armazena no banco de dados


