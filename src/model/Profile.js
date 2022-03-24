let data = {
    name: 'Lucas',
    avatar: 'https://github.com/lucasdam.png',
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}

module.exports = { // Exporta o get() que retorna o data.
    get() {
        return data
    },
    update(newData) {
        data = newData
    }
}

// Model responsável por fornecer dados para outros arquivos.