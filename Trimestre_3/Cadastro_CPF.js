const express = require('express');
const app = express();
const port = 3000;
const professor = require('./DAO/professor');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importe a função validarCPF
const validarCPF = professor.validarCPF;

app.get('/', (req, res) => {
    res.send(`
    <h1>Página principal</h1>
    <h3>Cadastro Professor</h3>
    <ul>
      <li><a href="/inserir">Inserir</a></li>
      <li><a href="/apagar">Apagar</a></li>
      <li><a href="/listar">Listar</a></li>
      <li><a href="/atualizar">Atualizar</a></li>
    </ul>
  `);
});

app.get('/sucesso', (req, res) => {
    res.send(`
    <h1 style="color:green;">Operação executada com sucesso ;)</h1>
    <a href="/">Voltar</a>
  `);
});

app.get('/erro', (req, res) => {
    res.send(`
    <h1 style="color:red;">Ops...aconteceu algum problema</h1>
    <a href="/">Voltar</a>
  `);
});

app.get('/inserir', (req, res) => {
    res.send(`
    <ul>
      <li><a href="/">Principal</a></li>
      <li><a href="/apagar">Apagar</a></li>
      <li><a href="/atualizar">Atualizar</a></li>
      <li><a href="/listar">Listar</a></li>
    </ul>
    <h1>Inserir Professor</h1>
    <form action="/inserirprofessor" method="post">
      <label>CPF:</label>
      <input type="text" name="cpf" required><br><br>
      <label>Nome:</label>
      <input type="text" name="nome" required><br><br>
      <label>Titulação:</label>
      <input type="text" name="titulacao" required><br><br>
      <input type="submit" value="Inserir">
    </form>
  `);
});

app.post('/inserirprofessor', (req, res) => {
    const cpf = req.body.cpf;
    const nome = req.body.nome;
    const titulacao = req.body.titulacao;

    // Use a função validarCPF
    try {
        validarCPF(cpf);
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
    } catch (error) {
        console.error(error);
        res.redirect('/erro');
    }
});

app.get('/listar', (req, res) => {
    professor.ListarTodosProfessores((err, results) => {
        if (err) {
            console.error(err);
            res.redirect('/erro');
        } else {
            res.send(`
        <h1>Lista de Professores</h1>
        <ul>
          <li><a href="/inserir">Inserir Professor</a></li>
          <li><a href="/apagar">Apagar Professor</a></li>
          <li><a href="/atualizar">Atualizar Professor</a></li>
        </ul>
        <br>
        <table>
          <tr>
            <th>ID</th>
            <th>CPF</th>
            <th>Nome</th>
            <th>Titulação</th>
          </tr>
          ${results
                    .map(
                        (prof) =>
                            `<tr><td>${prof.id}</td><td>${prof.cpf}</td><td>${prof.nome}</td><td>${prof.titulacao}</td></tr>`
                    )
                    .join('')}
        </table>
      `);
        }
    });
});

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
