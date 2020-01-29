const express = require('express');

const server = express();

// Fazendo o servidor aceitar json
server.use(express.json());

// Criando array de projetos
const projects = [];

// Modo POST = Criar projeto
server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = { id, title, tasks:[]};

    projects.push(project);
    return res.json(project);

});

// Modo GET = Listar projetos
server.get('/projects', (req, res) => {
    return res.json(projects);
});

// Modo PUT = Alterar projeto através do ID
server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(proj => proj.id == id)

    project.title = title;
    return res.json(project);

});

// Modo DELETE = Excluir projeto
server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    const projIndex = projects.findIndex(proj => proj.id == id)
    projects.splice(projIndex, 1);
    return res.json(projects);

});

// Modo POST da Tasks
server.post('/projects/:id/tasks', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(proj => proj.id == id);

    project.tasks.push(title);
    return res.json(project);

});




// Porta do servidor
server.listen(3333);
