const { Client } = require('pg')

const client = new Client({
    host: '......',
    port: 0000,
    database: '......',
    user: '....',
    password: '....'
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
