const express = require('express');
const app = express();
const port = 3000;

const alunos = {
    "1": { nome: 'Eduardo', nota: [10, 9.6, 8] },
    "2": { nome: 'Bianca', nota: [1, 6, 4] },
    "3": { nome: 'Carlos', nota: [2, 9.6, 10] }
};

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/alunos', (req, res) => {
    res.status(200).json(alunos);
});

app.get('/alunos/:indice', (req, res) => {
    const indice = req.params.indice;
    if (alunos[indice]) {
        res.status(200).json(alunos[indice]);
    } else {
        res.status(404).json({ error: 'Página não encontrada' });
    }
});

app.post('/alunos', express.json(), (req, res) => {
    const { indice, nome } = req.body;
    if (!indice || !nome) {
        res.status(400).json({ error: 'Índice e nome são campos obrigatórios' });
    } else if (alunos[indice]) {
        res.status(409).json({ error: 'Dados não podem ser inseridos, índice existente' });
    } else {
        alunos[indice] = { nome, nota: [] };
        res.status(200).json({ message: 'Dados inseridos com sucesso' });
    }
});

app.post('/notas', express.json(), (req, res) => {
    const { indice, nota } = req.body;
    if (!indice || !nota) {
        res.status(400).json({ error: 'Índice e notas são campos obrigatórios' });
    } else if (alunos[indice]) {
        alunos[indice].nota.push(nota);
        res.status(200).json({ message: 'Dados inseridos com sucesso' });
    } else {
        res.status(409).json({ error: 'Dados não podem ser inseridos, índice existente' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
