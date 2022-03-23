const express = require('express') // Importa o express
const routes = express.Router() // Do express, pega o Router

const views = __dirname + '/views/' // __dirname refere-se a esta página atual, /src.

const Profile = {
    data: {
        name: 'Lucas',
        avatar: 'https://github.com/lucasdam.png',
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers: {
        index(req, res) {
            return res.render(views + 'profile', { profile: Profile.data }) // Renderiza o profile com os datas do objeto Profile.
        },
        update(req, res) {
            const data = req.body // Pega os dados
            const weeksPerYear = 52 // Semanas no ano
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12 // Semanas no mês (removendo as semanas de férias do ano)
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"] // Horas trabalhadas por semana
            const monthlyTotalHours = weekTotalHours * weeksPerMonth // Horas trabalhadas no mês
            const valueHour = data["monthly-budget"] / monthlyTotalHours // Valor da hora trabalhada

            Profile.data = { // Populando o array Profile
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }

            return res.redirect('/profile')
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: 'Pizzaria Guloso',
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now()
        },
        {
            id: 2,
            name: 'OneTwo Project',
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now()
        }
    ],
    controllers: {
        index(req, res) { // Request da página '/' e Response da renderização do index.html. Passando também o array de updatedJobs.
            const updatedJobs = Job.data.map(job => { // Cálcule de tempo restante do job
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'

                return {
                    ...job, // Spread do job
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })

            return res.render(views + 'index', { jobs: updatedJobs })
        },
        create(req, res) { // Renderiza a página de job
            return res.render(views + 'job')
        },
        save(req, res) { // Adiciona um novo job
            const lastId = Job.data[Job.data.length - 1]?.id || 0

            Job.data.push({ // Inserindo um objeto job no array jobs
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // Atribuindo a data de agora. Data de criação.
            })

            return res.redirect('/') // Redireciona para a página inicial.
        },
        show(req, res) {
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render(views + 'job-edit', { job }) // Renderiza a página de edição de job
        },
        update(req, res) {
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }

            const updatedJob = {
                ...job, // Espalha tudo o que já tem desse objeto job
                name: req.body.name, // Sobrescrevendo o name
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
            }

            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(jobId)) {
                    job = updatedJob
                }
                
                return job
            })
            
            res.redirect('/job/' + jobId) // Redireciona para a mesma página
        },
        delete(req, res) {
            const jobId = req.params.id

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId)) // Quando o job.id for diferente do jobId, retornando false para o filter, essa função irá remover esse job. E o restante é devolvido.

            return res.redirect('/') // Redireciona para a página inicial após deletar o job
        }
    },
    services: {
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
}

routes.get('/', Job.controllers.index) // Request da página '/' e Response da renderização do index.html que está configurado no Job.controllers.

routes.get('/job', Job.controllers.create) // O Client pede o '/job' e o Server retorna o '/job.html' através do Job.controllers.create.

routes.post('/job', Job.controllers.save) // Método post para o formulário de job.html

routes.get('/job/:id', Job.controllers.show) // Rota '/job:id', é um job específico.

routes.post('/job/:id', Job.controllers.update) // Post no job:id específico para atualizar o projeto

routes.post('/job/delete/:id', Job.controllers.delete) // Rota. Post para excluir o job

routes.get('/profile', Profile.controllers.index) // Rota '/profile' passando o objeto profile em Profile.controllers.index.

routes.post('/profile', Profile.controllers.update) // Post do profile

module.exports = routes // Exporta o routes para quem precisar usar (ex: server.js).