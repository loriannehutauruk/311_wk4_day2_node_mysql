const mysql = require('mysql')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: '35.222.68.207',
        user: 'root',
        password: 'hcp100pre',
        database: 'admin',
        debug: false
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;