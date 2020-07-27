const mysql = require('mysql')
const mysqlconfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'test'
}

const pool = mysql.createPool({
  host : mysqlconfig.host,
  user : mysqlconfig.user,
  password : mysqlconfig.password,
  port : mysqlconfig.post,
  database : mysqlconfig.database,
  multipleStatements: true
})

pool.getConnection(function(err){
  if(err){
    console.log('err')
  }else{
    console.log('success')
  }
})

module.exports = {pool}