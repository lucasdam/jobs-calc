const express = require('express') // Importa o express
const routes = express.Router() // Do express, pega o Router
const ProfileController = require('./controllers/ProfileController') // Importa o controller do Profile
const JobController = require('./controllers/JobController') // Importa o controller do Job
const DashboardController = require('./controllers/DashboardController') // Importa o DashboardController

routes.get('/', DashboardController.index) // Request da página '/' e Response da renderização do index.html que está configurado no DashboardController.

routes.get('/job', JobController.create) // O Client pede o '/job' e o Server retorna o '/job.html' através do JobController.create.

routes.post('/job', JobController.save) // Método post para o formulário de job.html

routes.get('/job/:id', JobController.show) // Rota '/job:id', é um job específico.

routes.post('/job/:id', JobController.update) // Post no job:id específico para atualizar o projeto

routes.post('/job/delete/:id', JobController.delete) // Rota. Post para excluir o job

routes.get('/profile', ProfileController.index) // Rota '/profile' passando o objeto profile em ProfileController.index.

routes.post('/profile', ProfileController.update) // Post do profile

module.exports = routes // Exporta o routes para quem precisar usar (ex: server.js).