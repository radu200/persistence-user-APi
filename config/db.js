const credentials = require('./credentials.js')
 
const mysql = require ('mysql2/promise')

 const db =  mysql.createConnection({
  host: credentials.DB_HOST,
  user: credentials.DB_USER,
  password: credentials.DB_PASSWORD,
  database : credentials.DB_NAME,

 })


 module.exports = db;
