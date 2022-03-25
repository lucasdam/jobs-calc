const Database = require('../db/config') // Importa o config db

module.exports = {

    async get() {
        const db = await Database() // Abre a conexão

        const jobs = await db.all(`SELECT * FROM jobs`) // all() pega tudo do banco

        await db.close() // Fecha a conexão

        return jobs.map(job => ({ // Novo array trocando as chaves de cada item dos objetos
            // ATENÇÃO NA SINTAXE. Aqui está sendo retornado um objeto. Nesse caso específico, não precisa do return {...}
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at
        }))
    },

    async update(updatedJob, jobId) {
        const db = await Database()

        await db.run(`
            UPDATE jobs SET 
                name = "${updatedJob.name}",
                daily_hours = ${updatedJob["daily-hours"]},
                total_hours = ${updatedJob["total-hours"]}
            WHERE id = ${jobId}
        `)

        await db.close()
    },

    async delete(id) {
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
    },

    async create(newJob) {
        const db = await Database()

        await db.run(`
        INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        await db.close()
    }

}