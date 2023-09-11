const express = require('express');
//instalar express: npm install express
const app = express();
const port = 3000
const aluno = require('./DAO/aluno');
//instalar o mysql2 
//na pasta principal: npm install mysql2
const bodyParser = require('body-parser');
//instalar na pasta raiz npm install body-parser
app.use(bodyParser.urlencoded({extended: false})) ;
app.use(bodyParser.json()) ;

app.get('/', (req, res) => {
  res.send(`
  <h1>Página principal</h1>
  <h3>Cadastro Aluno</h3>
  <ul>
    <li><a href="/inserir">Inserir</a></li>
    <li><a href="/apagar">Apagar</a></li>
    <li><a href="/listar">Listar</a></li>
    <li><a href="/atualizar">Atualizar</a></li> <!-- Adicione esta linha -->
  </ul>
  `);
});


app.get('/sucesso', (req, res) => {
  res.send(`<h1 style="color:green;"> Operação executada com sucesso ;)</h1>
  <a href="/">Voltar</a>`)
})

app.get('/erro', (req, res) => {
  res.send(`<h1 style="color:red;"> Ops...aconteceu algum problema</h1>
  <a href="/">Voltar</a>`)
})

app.get('/inserir', (req, res) => {
    res.send(`
    <ul>
    <li><a href="/">Principal</a></li>
    <li><a href="/apagar">Apagar</a></li>
    <li><a href="/atualizar">Atualizar</a></li>
    <li><a href="/listar">Listar</a></li>
    </ul>
    <h1>Inserir Aluno</h1>
    <form action="/inseriraluno" method="post"> 
      <label>Nome:</label>
      <input type="text" name="nome" required><br><br>
      <label>Idade:</label>
      <input type="number" name="idade" required><br><br>
      <input type="submit" value="Inserir">
    </form>    
    `);
  })

app.post('/inseriraluno', (req, res) => {
   
  const nome = req.body.nome;
  const idade = req.body.idade;
 
  aluno.Inserir(nome, idade, (err, rows) => {
    if (err) {
        console.error(err);
        res.redirect('/erro');
    } else {
        if (rows > 0) {
            res.redirect('/listar');
        } else {
            res.redirect('/erro');
        }
    }
 });
});

  app.get('/listar', (req, res) => {
    aluno.ListarTodosAlunos((err,results)=>
    {  console.log(results);
      
      res.send(`
        <h1>Menu</h1>
         <ul>
           <li><a href="/inserir">Adicionar Aluno</a></li>
           <li><a href="/apagar">Apagar Aluno</a></li>
           <li><a href="/atualizar">Atualizar</a></li>
         </ul>
         <br>
          <table>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
            </tr>
            ${results.map(aluno => `<tr><td>${aluno.id}</td><td>${aluno.nome}</td><td>${aluno.idade}</td></tr>`).join('')}
          </table>
        `);
    });
  });

  // Rota para a página de apagar aluno
app.get('/apagar', (req, res) => {
    res.send(`
      <ul>
        <li><a href="/">Principal</a></li>
        <li><a href="/inserir">Inserir</a></li>
        <li><a href="/listar">Listar</a></li>
        <li><a href="/atualizar">Atualizar</a></li>
      </ul>
      <h1>Apagar Aluno</h1>
      <form action="/apagaraluno" method="post">
        <label>ID do Aluno:</label>
        <input type="number" name="id" required><br><br>
        <input type="submit" value="Apagar">
      </form>
    `);
  });
  
  // Rota para a função de apagar o aluno
  app.post('/apagaraluno', (req, res) => {
    const idAluno = req.body.id;
    
    aluno.Apagar(idAluno, (err, result) => {
      if (err) {
        console.error(err);
        res.redirect('/erro');
      } else {
        if (result.affectedRows > 0) {
          res.redirect('/sucesso');
        } else {
          res.redirect('/erro');
        }
      }
    });
  });

  app.get('/atualizar', (req, res) => {
    res.send(`
      <ul>
        <li><a href="/">Principal</a></li>
        <li><a href="/inserir">Inserir</a></li>
        <li><a href="/listar">Listar</a></li>
      </ul>
      <h1>Atualizar Aluno</h1>
      <form action="/atualizaraluno" method="post">
        <label>ID do Aluno:</label>
        <input type="number" name="id" required><br><br>
        <label>Novo Nome:</label>
        <input type="text" name="novoNome" required><br><br>
        <input type="submit" value="Atualizar">
      </form>
    `);
  });

  app.post('/atualizaraluno', (req, res) => {
    const idAluno = req.body.id;
    const novoNome = req.body.novoNome;
  
    aluno.Atualizar(idAluno, novoNome, (err, result) => {
      if (err) {
        console.error(err);
        res.redirect('/erro');
      } else {
        if (result.affectedRows > 0) {
          res.redirect('/sucesso');
        } else {
          res.redirect('/erro');
        }
      }
    });
  });
  
 

app.listen('3000', () => {
  console.log('Server started on port 3000');
});