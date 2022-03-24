module.exports = { // Habilita para exportação
    remainingDays(job) { // Tempo restante de cada job
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() // Dias para trabalhar no job = Total de horas que levarei para concluí-lo / Horas que trabalharei por dia

        const createdDate = new Date(job.created_at) // Data que o job foi criado
        const dueDay = createdDate.getDate() + Number(remainingDays) // getDate() pega o dia do mês
        const dueDateInMs = createdDate.setDate(dueDay) // Data do vencimento

        const timeDiffInMs = dueDateInMs - Date.now()

        // Transformar milisegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)

        return dayDiff // Retorna quantos dias restam para a entrega do job
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"] // Calculo de cobrança
}