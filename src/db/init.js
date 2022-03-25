const Database = require('./config') // Importa o config que possui o open()

const initDb = {

    async init() { // Função assíncrona para criar e preencher tabelas

        const db = await Database() // Já inicia a conexão com o banco

        // Cria tabela profile
        await db.exec(`
            CREATE TABLE profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthly_budget INT,
                days_per_week INT,
                hours_per_day INT,
                vacation_per_year INT,
                value_hour INT
            )
        `)

        // Cria tabela jobs
        await db.exec(`
            CREATE TABLE jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME
            )
        `)

        // Insere na tabela profile
        await db.run(`
            INSERT INTO profile (
                name,
                avatar,
                monthly_budget,
                days_per_week,
                hours_per_day,
                vacation_per_year,
                value_hour
            ) VALUES (
                "Lucas",
                "https://github.com/lucasdam.png",
                3000,
                5,
                5,
                4,
                75
            )
        `)

        // Insere na tabela jobs
        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "Pizzaria Guloso",
                2,
                1,
                1617514376018
            )
        `)

        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "OneTwo Projects",
                3,
                47,
                1617514376018
            )
        `)

        await db.close() // Fecha a conexão

    }

}

initDb.init()