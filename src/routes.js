const express = require('express') // Importa o express
const routes = express.Router() // Do express, pega o Router

const views = __dirname + '/views/' // __dirname refere-se a esta página atual, /src.

const profile = {
    name: 'Lucas',
    avatar: 'https://github.com/lucasdam.png',
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

// Request da página '/' e Response da renderização do index.html.
routes.get('/', (req, res) => 
    res.render(views + 'index'))

// O Client pede o '/job' e o Server retorna o '/job.html'.
routes.get('/job', (req, res) => 
    res.render(views + 'job')) 

// Rota '/job/edit'.
routes.get('/job/edit', (req, res) => 
    res.render(views + 'job-edit')) 

// Rota '/profile' passando o objeto profile.
routes.get('/profile', (req, res) => 
    res.render(views + 'profile', { profile })) 

module.exports = routes // Exporta o routes para quem precisar usar (ex: server.js).