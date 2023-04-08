require("dotenv").config();
const express = require('express');
const controllers = require("./controllers.js");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// Basic Routes
app.get('/qa/questions/:product_id', controllers.getAllQuestions);
app.get('/qa/questions/:question_id/answers', controllers.getAllAnswers);

app.post('/qa/questions', controllers.postQuestion);
app.post('/qa/questions/:question_id/answers', controllers.postAnswer);

app.put('/qa/questions/:question_id/helpful', controllers.putHelpfulQ);
app.put('/qa/questions/:question_id/report', controllers.putReportQ);
app.put('/qa/answers/:answer_id/helpful', controllers.putHelpfulA);
app.put('/qa/answers/:answer_id/report', controllers.putReportA);









app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})