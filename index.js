require("dotenv").config();
const express = require('express');
const controllers = require("./controllers.js");
const app = express();
const PORT = 3000;

app.use(express.json());


// Routes
app.get('/qa', controllers.getTwo);









app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})