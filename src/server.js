const express = require('express') // Pega o Express e guarda em uma variável.
const server = express() // Guarda a execução da função express.
const routes = require('./routes') // Importa o routes.js
const path = require('path')

server.set('view engine', 'ejs') // Seta uma configuração de view engine ejs.

server.set('views', path.join(__dirname, 'views')) // Mudar localicazação da pasta views. Dá um join do __dirname (pasta que esse arquivo server.js está dentro) com a 'views'

server.use(express.static('public')) // Middleware. Vai habilitar os arquivos estáticos da pasta /public.

server.use(express.urlencoded({ extended: true })) // Libera o uso do req.body

server.use(routes) // Usa as rotas

server.listen(3000, () => console.log('Running...')) // Ouvindo na porta 3000 e informando que o server está rodando.