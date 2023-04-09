const db = require('./dbconnection.js');

module.exports = {
  getTwoQuestions: (callback) => {
    var queryStr = 'SELECT * FROM questions LIMIT 2';
    db.query(queryStr, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  getAllQuestions: (product_id, callback) => {
    console.log("got to models.getAllQuestions with this: ", product_id);
    // var queryStr = 'SELECT * FROM questions LIMIT 2';
    // db.query(queryStr, (err, data) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     callback(null, data);
    //   }
    // });
  },

  getAllAnswers: (question_id, callback) => {
    console.log("got to models.getAllAnswers with this: ", question_id);
    // var queryStr = 'SELECT * FROM questions LIMIT 2';
    // db.query(queryStr, (err, data) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     callback(null, data);
    //   }
    // });
  },

  postQuestion: (questionObj, callback) => {
    console.log("got to models.postQuestion with this questionObj: ", questionObj);
    // var queryStr = 'SELECT * FROM questions LIMIT 2';
    // db.query(queryStr, (err, data) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     callback(null, data);
    //   }
    // });
  },

  postAnswer: (answerObj, question_id, callback) => {
    console.log("got to models.postQuestion with this answerObj: ", answerObj, " and this question_id: ", question_id);
    // var queryStr = 'SELECT * FROM questions LIMIT 2';
    // db.query(queryStr, (err, data) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     callback(null, data);
    //   }
    // });
  },

  putHelpfulQ:(question_id, callback) => {
    console.log("got to models.putHelpfulQ with this question_id: ", question_id);
    // var queryStr = 'SELECT * FROM questions LIMIT 2';
    // db.query(queryStr, (err, data) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     callback(null, data);
    //   }
    // });
  },

  putReportQ:(question_id, callback) => {
    console.log("got to models.putReportQ with this question_id: ", question_id);
    // var queryStr = 'SELECT * FROM questions LIMIT 2';
    // db.query(queryStr, (err, data) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     callback(null, data);
    //   }
    // });
  },

  putHelpfulA:(answer_id, callback) => {
    console.log("got to models.putHelpfulA with this answer_id: ", answer_id);
    // var queryStr = 'SELECT * FROM questions LIMIT 2';
    // db.query(queryStr, (err, data) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     callback(null, data);
    //   }
    // });
  },
  putReportA:(answer_id, callback) => {
    console.log("got to models.putReportA with this answer_id: ", answer_id);
    // var queryStr = 'SELECT * FROM questions LIMIT 2';
    // db.query(queryStr, (err, data) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     callback(null, data);
    //   }
    // });
  }
};