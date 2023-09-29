const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/customer', db.getCustomers)
app.get('/customer/:username', db.getCustomerById)
app.post('/customer', db.createCustomer)
app.put('/customer/:username', db.updateCustomer)
app.delete('/customer/:username', db.deleteCustomer)

app.listen(port, () => {
console.log(`App running on port ${port}.`)
})