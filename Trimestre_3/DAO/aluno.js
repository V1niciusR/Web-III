const mysql = require('mysql2');//pacote para mysql

let connection;//hospeda conexão mysql
//conexão
try{
connection = mysql.createConnection
  ({
    host: 'localhost',user: 'root',database: 'escola'
  });//cria a conexão e coloca na variavel connection
 
}//fim bloco try
catch(error)
{   error.stack="";//limpar pilha de execução
    console.error(error.message);   
}//fim bloco cacth



//INSERT
function Inserir(Nome, Idade, callback) {
  
  connection.query(
      'INSERT INTO Aluno (Nome, Idade) VALUES (?, ?)',
      [Nome, Idade],
      function(err, results) {
          if (err) {
              callback(err, null); // Chama o callback com erro
          } else {
              callback(null, results.affectedRows); // Chama o callback com o número de linhas afetadas
          }
      }
  );
}


//DELETE
function Apagar(idAluno)
{
connection.query(
  "DELETE FROM aluno where aluno.id=?",
  [idAluno],
  function(err,results)
  {
    if(err) 
    throw new Error("Problema ao apagar registro");
    else
    console.log("Registro cancelado");
  }
  );  
}

//UPDATE
function Atualizar(id,nome)
{
  connection.query("UPDATE aluno SET nome=?"+
  " where aluno.id=?",
  [nome,id],
   function(err,results)
   {
    if(err) 
    throw new Error("Problema ao atualizar");
    else 
    console.log("Item atualizado com sucesso"); 
  } 
  );
}//fim atualizar

function ListarTodosAlunos(callback)
{
  connection.query(
    "SELECT * FROM aluno",
    function(err,results)
    {
      if (err) {
        callback(err, null); // Chama o callback com erro
       } else {
        callback(null, results);
      } // Chama o callback com o resultado
    }
    );  
}


// DELETE
function Apagar(idAluno, callback) {
    console.log('ID do Aluno a ser apagado:', idAluno);
    
    connection.query(
      "DELETE FROM aluno WHERE aluno.id = ?",
      [idAluno],
      function (err, results) {
        if (err) {
          console.error('Erro ao apagar aluno:', err);
          callback(err, null);
        } else {
          console.log('Resultado da operação de apagar aluno:', results);
          callback(null, results);
        }
      }
    );
  }

  function Atualizar(id, novoNome, callback) {
    connection.query(
      "UPDATE aluno SET nome = ? WHERE aluno.id = ?",
      [novoNome, id],
      function (err, results) {
        if (err) {
          console.error('Erro ao atualizar aluno:', err);
          callback(err, null);
        } else {
          console.log('Resultado da operação de atualizar aluno:', results);
          callback(null, results);
        }
      }
    );
  }
  

  module.exports = { Inserir, ListarTodosAlunos, Apagar, Atualizar };