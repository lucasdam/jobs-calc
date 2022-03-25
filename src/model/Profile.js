const Database = require('../db/config') // Importa o config db

module.exports = { // Exporta o get() que retorna o data.

    async get() {
        const db = await Database()

        let data = await db.get(`SELECT * FROM profile`) // get() para select no banco

        await db.close()

        data = { // Substitui - por _ nos atributos do objeto data
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        }

        return data
    },

    async update(newData) { // Atualiza os dados de profile
        const db = await Database()

        db.run(`UPDATE profile SET
            name = "${newData.name}",
            avatar = "${newData.avatar}",
            monthly_budget = ${newData["monthly-budget"]},
            days_per_week = ${newData["days-per-week"]},
            hours_per_day = ${newData["hours-per-day"]},
            vacation_per_year = ${newData["vacation-per-year"]},
            value_hour = ${newData["value-hour"]}`)

        await db.close()
    }
    
}

// Model responsável por fornecer dados para outros arquivos.