let data = [
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
]

module.exports = {
    get() {
        return data
    },
    update(newJob) {
        data = newJob
    },
    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id)) // Quando o job.id for diferente do id (que veio do JobController), retornando false para o filter, essa função irá remover esse job. E o restante é devolvido.
    }
}