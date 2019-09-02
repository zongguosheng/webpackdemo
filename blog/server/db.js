const mysql = require('mysql')
const mysqlconfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'test'
}

//  链接池：创建多个链接、复用与分发链接

// eslint-disable-next-line no-unused-vars
const pool = mysql.createPool({
  host: mysqlconfig.host,
  user: mysqlconfig.user,
  password: mysqlconfig.password,
  port: mysqlconfig.port,
  database: mysqlconfig.database,
  multipleStatements: true // 多语句查询
})
pool.getConnection(function (err) {
  if (err) {
    console.log('err')
  } else {
    console.log('success')
  }
})

module.exports = {pool}

// module.exports = {
//   pool: mysql.createPool({
//     host: mysqlconfig.host,
//     user: mysqlconfig.user,
//     password: mysqlconfig.password,
//     port: mysqlconfig.port,
//     database: mysqlconfig.database,
//     multipleStatements: true // 多语句查询
//   })
// }
