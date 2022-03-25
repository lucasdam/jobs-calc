const sqlite3 = require('sqlite3') // Importa o sqlite3
const { open } = require('sqlite') // Importa a funcionalidade open do sqlite

// Exporta o open(), que precis estar dentro de uma estrutura de função
module.exports = () => open({ // Open abre a conexão com o banco de dados
    filename: './src/db/database.sqlite', // Arquivo onde será guardado os dados
    driver: sqlite3.Database // Responsável por realizar a função de guardar
})