const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const professor = require('./DAO/professor'); // Importe o módulo professor

// Configuração do middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Estilos CSS para deixar a página mais atrativa
const styles = `
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 0;
    }
    h1 {
      background-color: #007bff;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    ul {
      list-style-type: none;
      padding: 0;
      background-color: #007bff;
      overflow: hidden;
    }
    li {
      float: left;
      margin-right: 20px;
    }
    li a {
      color: #fff;
      text-decoration: none;
    }
    li a:hover {
      text-decoration: underline;
    }
    .container {
      max-width: 800px;
      margin: 20px auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #007bff;
      color: #fff;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
  </style>
`;

// Rota da página inicial
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Cadastro de Professores</title>
      ${styles}
    </head>
    <body>
      <h1>Bem-vindo ao Cadastro de Professores</h1>
      <ul>
        <li><a href="/inserir">Inserir Professor</a></li>
        <li><a href="/listar">Listar Professores</a></li>
        <li><a href="/apagar">Apagar Professor</a></li>
        <li><a href="/atualizar">Atualizar Professor</a></li>
      </ul>
    </body>
    </html>
  `);
});

// Rota para sucesso
app.get('/sucesso', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Sucesso</title>
    </head>
    <body>
      <h1 style="color: green;">Operação executada com sucesso</h1>
      <a href="/">Voltar</a>
    </body>
    </html>
  `);
});

// Rota para erro
app.get('/erro', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Erro</title>
    </head>
    <body>
      <h1 style="color: red;">Ops... algo deu errado</h1>
      <a href="/">Voltar</a>
    </body>
    </html>
  `);
});

// Rota para inserir um novo professor
app.get('/inserir', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Inserir Professor</title>
    </head>
    <body>
      <h1>Inserir Professor</h1>
      <form action="/inserirprofessor" method="post">
        <label for="cpf">CPF:</label>
        <input type="text" name="cpf" required><br><br>
        <label for="nome">Nome:</label>
        <input type="text" name="nome" required><br><br>
        <label for="titulacao">Titulação:</label>
        <select name="titulacao">
          <option value="Doutor">Doutor</option>
          <option value="Mestre">Mestre</option>
          <option value="Especialista">Especialista</option>
          <option value="Graduado">Graduado</option>
        </select><br><br>
        <input type="submit" value="Inserir">
      </form>
    </body>
    </html>
  `);
});

// Rota para processar o formulário de inserção
app.post('/inserirprofessor', (req, res) => {
  const cpf = req.body.cpf;
  const nome = req.body.nome;
  const titulacao = req.body.titulacao;

  // Verifique o CPF aqui

  professor.Inserir(cpf, nome, titulacao, (err, rows) => {
    if (err) {
      console.error(err);
      res.redirect('/erro');
    } else {
      if (rows > 0) {
        res.redirect('/sucesso');
      } else {
        res.redirect('/erro');
      }
    }
  });
});

// Rota para listar todos os professores
app.get('/listar', (req, res) => {
  professor.ListarTodosProfessores((err, results) => {
    if (err) {
      console.error(err);
      res.redirect('/erro');
      return;
    }

    res.send(`
      <html>
      <head>
        <title>Lista de Professores</title>
      </head>
      <body>
        <h1>Lista de Professores</h1>
        <ul>
          <li><a href="/">Voltar</a></li>
          <li><a href="/inserir">Inserir Professor</a></li>
          <li><a href="/apagar">Apagar Professor</a></li>
          <li><a href="/atualizar">Atualizar Professor</a></li>
        </ul>
        <br>
        <table border="1">
          <tr>
            <th>ID</th>
            <th>CPF</th>
            <th>Nome</th>
            <th>Titulação</th>
          </tr>
          ${results.map(prof => `
            <tr>
              <td>${prof.id}</td>
              <td>${prof.cpf}</td>
              <td>${prof.nome}</td>
              <td>${prof.titulacao}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `);
  });
});

// Rota para a página de apagar professor
app.get('/apagar', (req, res) => {
  res.send(`
    <ul>
      <li><a href="/">Principal</a></li>
      <li><a href="/inserir">Inserir</a></li>
      <li><a href="/listar">Listar</a></li>
      <li><a href="/atualizar">Atualizar</a></li>
    </ul>
    <h1>Apagar Professor</h1>
    <form action="/apagarprofessor" method="post">
      <label>ID do Professor:</label>
      <input type="number" name="id" required><br><br>
      <input type="submit" value="Apagar">
    </form>
  `);
});

// Rota para a função de apagar o professor
app.post('/apagarprofessor', (req, res) => {
  const idProfessor = req.body.id;

  professor.Apagar(idProfessor, (err, result) => {
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
    <h1>Atualizar Professor</h1>
    <form action="/atualizarprofessor" method="post">
      <label>ID do Professor:</label>
      <input type="number" name="id" required><br><br>
      <label>Novo Nome:</label>
      <input type="text" name="novoNome" required><br><br>
      <input type="submit" value="Atualizar">
    </form>
  `);
});

app.post('/atualizarprofessor', (req, res) => {
  const idProfessor = req.body.id;
  const novoNome = req.body.novoNome;

  professor.Atualizar(idProfessor, novoNome, (err, result) => {
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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
