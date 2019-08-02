const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT id, first, last FROM users WHERE id = ${10}
  let sql = `SELECT ??, ??, ?? FROM ?? WHERE ?? = ${req.params.id}`
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['id', 'first_name', 'last_name', 'users', 'id'])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
 
  pool.query('INSERT INTO users SET ?', {first_name: 'Test', last_name: 'User'}, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = `UPDATE ?? SET first_name = ?, last_name = ? WHERE id = ${req.params.id}`
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'First Updated', 'Last Updated',])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = `DELETE FROM ?? WHERE ?? = '${req.params.first_name}'`
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name'])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}