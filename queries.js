const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sungketpatel',
  host: 'localhost',
  database: 'cycleshop',
  password: 'password',
  port: 5432,
})

const getCustomers = (request, response) => {
  pool.query('SELECT * FROM customer ORDER BY username ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCustomerById = (request, response) => {
  const username = (request.params.username)

  pool.query('SELECT * FROM customer WHERE username = $1', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCustomer = (request, response) => {
  const { address_id, username, first_name, surname } = request.body

  pool.query('INSERT INTO customer (address_id, username, first_name, surname) VALUES ($1, $2, $3, $4) RETURNING username', [address_id, username, first_name, surname], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Customer added with username: ${results.insertUsername}`)
  })
}

const updateCustomer = (request, response) => {
  const username = (request.params.username)
  const { address_id, first_name, surname } = request.body

  pool.query(
    'UPDATE customer SET address_id = $1, first_name = $2, surname = $3 WHERE username = $4', 
    [address_id, first_name, surname, username],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Customer modified with username: ${username}`)
    }
  )
}

const deleteCustomer = (request, response) => {
  const username = (request.params.username)

  pool.query('DELETE FROM customer WHERE username = $1', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Customer deleted with username: ${username}`)
  })
}

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
}