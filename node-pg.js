const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'structure_logicielle',
    user: 'postgres',
    password: 'postgres'
})

client.connect((error) => {
    if (error) {
        console.error('connection error', error.stack)
    } else {
        console.log('connected')
    }
})

client.query('SELECT * FROM nodepg', (error, result) => {
    if (error) {
        throw error
    }

    console.log(result)
    client.end()
})
