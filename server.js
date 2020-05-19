
const dao = require('.')
const assert = require('assert').strict
dao.connect()

dao.query('SELECT * FROM nodepg', [], (result) => {
    assert.strictEqual(result.command, 'SELECT')
})

// dao.query('SELECT count(*) AS total FROM nodepg', [], (countResult) => {
//     const total = parseInt(countResult.rows[0].total)

//     dao.query('INSERT INTO nodepg (stringField, numberField, booleanField) VALUES ($1, $2, $3)', ['chaîne de caractères 5', 669, false], function () {
//         dao.query('SELECT * FROM nodepg', [], (result) => {
//             assert.strictEqual(result.rowCount, total + 1)

//             dao.disconnect()
//         })
//     })
// })
