const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const professor = require('./DAO/professor'); // Importe o módulo professor

// Configuração do middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota da página inicial
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Cadastro de Professores</title>
      <!-- Adicione os estilos do Bootstrap -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    </head>
    <body>
      <div class="container">
        <h1 class="mt-5">Bem-vindo ao Cadastro de Professores</h1>
        <ul class="nav">
          <li class="nav-item"><a class="nav-link" href="/inserir">Inserir Professor</a></li>
          <li class="nav-item"><a class="nav-link" href="/listar">Listar Professores</a></li>
          <li class="nav-item"><a class="nav-link" href="/apagar">Apagar Professor</a></li>
          <li class="nav-item"><a class="nav-link" href="/atualizar">Atualizar Professor</a></li>
        </ul>
      </div>
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
      <!-- Adicione os estilos do Bootstrap -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      <!-- Adicione os estilos do animate.css -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    </head>
    <body>
      <div class="container mt-5">
        <h1 class="mb-4">Inserir Professor</h1>
        <ul class="nav">
            <li class="nav-item"><a class="nav-link" href="/">Voltar</a></li>
            <li class="nav-item"><a class="nav-link" href="/listar">Listar Professor</a></li>
            <li class="nav-item"><a class="nav-link" href="/apagar">Apagar Professor</a></li>
            <li class="nav-item"><a class="nav-link" href="/atualizar">Atualizar Professor</a></li>
          </ul>
        <form action="/inserirprofessor" method="post">
          <div class="form-group">
            <label for="cpf">CPF:</label>
            <input type="text" class="form-control" name="cpf" required>
          </div>
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" class="form-control" name="nome" required>
          </div>
          <div class="form-group">
            <label for="titulacao">Titulação:</label>
            <select class="form-control" name="titulacao">
              <option value="Doutor">Doutor</option>
              <option value="Mestre">Mestre</option>
              <option value="Especialista">Especialista</option>
              <option value="Graduado">Graduado</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Inserir</button>
        </form>
      </div>
      <!-- Adicione o script do Bootstrap -->
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
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
        <!-- Adicione os estilos do Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container mt-5">
          <h1>Lista de Professores</h1>
          <ul class="nav">
            <li class="nav-item"><a class="nav-link" href="/">Voltar</a></li>
            <li class="nav-item"><a class="nav-link" href="/inserir">Inserir Professor</a></li>
            <li class="nav-item"><a class="nav-link" href="/apagar">Apagar Professor</a></li>
            <li class="nav-item"><a class="nav-link" href="/atualizar">Atualizar Professor</a></li>
          </ul>
          <br>
          <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>ID</th>
                <th>CPF</th>
                <th>Nome</th>
                <th>Titulação</th>
              </tr>
            </thead>
            <tbody>
              ${results.map(prof => `
                <tr>
                  <td>${prof.id}</td>
                  <td>${prof.cpf}</td>
                  <td>${prof.nome}</td>
                  <td>${prof.titulacao}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <!-- Adicione o script do Bootstrap no final do body -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
      </html>
    `);
  });
});

// Rota para a página de apagar professor
app.get('/apagar', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Apagar Professor</title>
      <!-- Adicione os estilos do Bootstrap -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    </head>
    <body>
      <div class="container mt-5">
        <h1>Apagar Professor</h1>
        <ul class="nav">
          <li class="nav-item"><a class="nav-link" href="/">Principal</a></li>
          <li class="nav-item"><a class="nav-link" href="/inserir">Inserir</a></li>
          <li class="nav-item"><a class="nav-link" href="/listar">Listar</a></li>
          <li class="nav-item"><a class="nav-link" href="/atualizar">Atualizar</a></li>
        </ul>
        <br>
        <form action="/apagarprofessor" method="post">
          <div class="form-group">
            <label>ID do Professor:</label>
            <input type="number" class="form-control" name="id" required>
          </div>
          <button type="submit" class="btn btn-danger">Apagar</button>
        </form>
      </div>
      <!-- Adicione o script do Bootstrap no final do body -->
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </body>
    </html>
  `);
});

// Rota para a função de apagar o professor
app.post('/apagarprofessor', (req, res) => {
  const idProfessor = req.body.id;

  professor.Apagar(idProfessor, (err, result) => {
    if (err) {
      console.error(err);
      res.send(`
        <html>
        <head>
          <title>Erro</title>
        </head>
        <body>
          <h1 style="color: red;">Erro ao apagar o professor</h1>
          <a href="/">Voltar</a>
        </body>
        </html>
      `);
    } else {
      if (result.affectedRows > 0) {
        res.send(`
          <html>
          <head>
            <title>Sucesso</title>
          </head>
          <body>
            <h1 style="color: green;">Professor apagado com sucesso</h1>
            <a href="/">Voltar</a>
          </body>
          </html>
        `);
      } else {
        res.send(`
          <html>
          <head>
            <title>Erro</title>
          </head>
          <body>
            <h1 style="color: red;">Nenhum professor encontrado para apagar</h1>
            <a href="/">Voltar</a>
          </body>
          </html>
        `);
      }
    }
  });
});

app.get('/atualizar', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Atualizar Professor</title>
      <!-- Adicione os estilos do Bootstrap -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    </head>
    <body>
      <div class="container mt-5">
        <h1>Atualizar Professor</h1>
        <ul class="nav">
          <li class="nav-item"><a class="nav-link" href="/">Principal</a></li>
          <li class="nav-item"><a class="nav-link" href="/inserir">Inserir</a></li>
          <li class="nav-item"><a class="nav-link" href="/listar">Listar</a></li>
          <li class="nav-item"><a class="nav-link" href="/apagar">Apagar</a></li>
        </ul>
        <br>
        <form action="/atualizarprofessor" method="post">
          <div class="form-group">
            <label>ID do Professor:</label>
            <input type="number" class="form-control" name="id" required>
          </div>
          <div class="form-group">
            <label>Novo Nome:</label>
            <input type="text" class="form-control" name="novoNome" required>
          </div>
          <button type="submit" class="btn btn-primary">Atualizar</button>
        </form>
      </div>
      <!-- Adicione o script do Bootstrap no final do body -->
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </body>
    </html>
  `);
});

app.post('/atualizarprofessor', (req, res) => {
  const idProfessor = req.body.id;
  const novoNome = req.body.novoNome;

  professor.Atualizar(idProfessor, novoNome, (err, result) => {
    if (err) {
      console.error(err);
      res.send(`
        <html>
        <head>
          <title>Erro</title>
        </head>
        <body>
          <h1 style="color: red;">Erro ao atualizar o professor</h1>
          <a href="/">Voltar</a>
        </body>
        </html>
      `);
    } else {
      if (result.affectedRows > 0) {
        res.send(`
          <html>
          <head>
            <title>Sucesso</title>
          </head>
          <body>
            <h1 style="color: green;">Professor atualizado com sucesso</h1>
            <a href="/">Voltar</a>
          </body>
          </html>
        `);
      } else {
        res.send(`
          <html>
          <head>
            <title>Erro</title>
          </head>
          <body>
            <h1 style="color: red;">Nenhum professor encontrado para atualizar</h1>
            <a href="/">Voltar</a>
          </body>
          </html>
        `);
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
