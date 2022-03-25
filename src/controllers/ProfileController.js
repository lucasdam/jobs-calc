const Profile = require('../model/Profile') // Importa o model Profile

module.exports = { // Module exports torna "exportável"

    async index(req, res) {
        return res.render('profile', { profile: await Profile.get() }) // Renderiza o profile com os datas do objeto Profile. Profile.get() pega os dados da const Profile, que referem-se aos dados de Profile.js da pasta model.
    },

    async update(req, res) {
        const data = req.body // Pega os dados
        const weeksPerYear = 52 // Semanas no ano
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12 // Semanas no mês (removendo as semanas de férias do ano)
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"] // Horas trabalhadas por semana
        const monthlyTotalHours = weekTotalHours * weeksPerMonth // Horas trabalhadas no mês
        const valueHour = data["monthly-budget"] / monthlyTotalHours // Valor da hora trabalhada

        const profile = await Profile.get()

        await Profile.update({ // Atualiza o array Profile
            ...profile,
            ...req.body,
            "value-hour": valueHour
        })

        return res.redirect('/profile')
    }
    
}