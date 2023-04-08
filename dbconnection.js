require("dotenv").config();
const { Client } = require('pg');

const client = new Client({
  host:'localhost',
  port: 5432,
  database: 'QnA',
  user: 'jenessapeterson',
  password: process.env.PASSWORD
})