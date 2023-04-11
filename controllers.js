const models = require("./models.js");

module.exports = {
  getTwo: (req, res) => {
    models.getTwoQuestions((err, data) => {
      if(err){
        console.log(err);
      } else {
        res.json(data);
      }
    });
  },

  getAllQuestions: (req, res) => {
    console.log("got to getAllQuestions with this product id: ", req.params.product_id);
    models.getAllQuestions(req.params.product_id, (err, data) => {
      if(err){
        console.log(err);
      } else {
        res.json(data.rows);
      }
    });
  },

  getAllAnswers: (req, res) => {
    console.log("got to getAllAnswers with this question_id: ", req.params.question_id);
    console.log('request.query: ', req.query);
    models.getAllAnswers(req.params.question_id, req.query.page, req.query.count, (err, reshapedData) => {
      if(err){
        console.log(err);
      } else {
        res.json(reshapedData);
      }
    });
  },

  postQuestion: (req, res) => {
    console.log("got to postQuestion with this req.body: ", req.body);

    models.postQuestion(req.body, (err, data) => {
      if(err){
        console.log(err);
      } else {
        res.json(data);
      }
    });
  },

  postAnswer:(req, res) => {
    console.log("got to postAnswer with this req.body: ", req.body, " and this question_id: ", req.params.question_id);

    models.postAnswer(req.body, req.params.question_id, (err, data) => {
      if(err){
        console.log(err);
      } else {
        res.json(data);
      }
    })
  },

  putHelpfulQ:(req, res) => {
    console.log("got to putHelpfulQ with this question_id: ", req.params.question_id);

    models.putHelpfulQ(req.params.question_id, (err, data) => {
      if(err){
        console.log(err);
      } else {
        res.json(data);
      }
    })
  },

  putReportQ: (req, res) => {
    console.log("got to putReportQ with this question_id: ", req.params.question_id);

    models.putReportQ(req.params.question_id, (err, data) => {
      if(err){
        console.log(err);
      } else {
        res.json(data);
      }
    })
  },

  putHelpfulA:(req, res) => {
    console.log("got to putHelpfulA with this answer_id: ", req.params.answer_id);

    models.putHelpfulA(req.params.answer_id, (err, data) => {
      if(err){
        console.log(err);
      } else {
        res.json(data);
      }
    })
  },

  putReportA: (req, res) => {
    console.log("got to putReportA with this answer_id: ", req.params.answer_id);

    models.putReportA(req.params.answer_id, (err, data) => {
      if(err){
        console.log(err);
      } else {
        res.json(data);
      }
    })
  }
};