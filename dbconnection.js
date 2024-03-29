require("dotenv").config();
const { Client } = require('pg');

const dbConnection = new Client({
  host:'localhost',
  port: 5432,
  database: 'QnA',
  user: 'jenessapeterson',
  password: process.env.PASSWORD
})

// const dbConnection = new Client({
//   user:process.env.PGUSER,
//   host:process.env.PGHOST,
//   database:process.env.PGDATABASE,
//   password:process.env.PGPASSWORD,
//   port:process.env.PGPORT
// })


dbConnection.connect((err) => {
  if(err) {
    console.error('Connection error: ', err.stack);
  } else {
    console.log('Connected to db');
  }
})



module.exports = dbConnection;

// This way returns a promise object instead of connecting directly.
// client
//   .connect()
//   .then(() => {
//     console.log('connected to db');
//   })
//   .catch ((err) => {
//     console.log('connection error: ', err.stack)
//   })