const Job = require('../model/Job') // Importa os dados de Job
const JobUtils = require('../Utils/JobUtils') // Importa o jobUtils
const Profile = require('../model/Profile') // Importa os dados de Profile

module.exports = { // Habilita para exportação.
    create(req, res) { // Renderiza a página de job
        return res.render('job')
    },
    save(req, res) { // Adiciona um novo job
        const jobs = Job.get()

        const lastId = jobs[jobs.length - 1]?.id || 0

        jobs.push({ // Inserindo um objeto job no array jobs
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // Atribuindo a data de agora. Data de criação.
        })

        return res.redirect('/') // Redireciona para a página inicial.
    },
    show(req, res) {
        const jobs = Job.get()
        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        const profile = Profile.get()

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render('job-edit', { job }) // Renderiza a página de edição de job
    },
    update(req, res) {
        const jobs = Job.get()
        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        const updatedJob = {
            ...job, // Espalha tudo o que já tem desse objeto job
            name: req.body.name, // Sobrescrevendo o name
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        const newJobs = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob
            }
            
            return job
        })

        Job.update(newJobs)
        
        res.redirect('/job/' + jobId) // Redireciona para a mesma página
    },
    delete(req, res) {
        const jobId = req.params.id

        Job.delete(jobId) // Passa o id do Job para que seja apagado no model Job.

        return res.redirect('/') // Redireciona para a página inicial após deletar o job.
    }
}