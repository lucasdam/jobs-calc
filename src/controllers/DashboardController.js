const Job = require('../model/Job') // Importa o model Job
const Profile = require('../model/Profile') // Importa o model Profile
const JobUtils = require('../Utils/JobUtils') // Importa o JobUtils

module.exports = {
    index(req, res) { // Request da página '/' e Response da renderização do index.html. Passando também o array de updatedJobs.
        const jobs = Job.get() // Pega o array de Job e guarda em Jobs
        const profile = Profile.get() // Pega os dados de Profile

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0 
    
        const updatedJobs = jobs.map(job => { // Cálcule de tempo restante do job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            statusCount[status] += 1 // Somando a quantidade de status

            // Total de horas por dia dos Jobs em progresso
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

            return {
                ...job, // Spread do job
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        const freeHours = profile["hours-per-day"] - jobTotalHours
    
        return res.render('index', { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours }) // Passa para o index.ejs alguns objetos com valores a serem renderizados lá
    }
}