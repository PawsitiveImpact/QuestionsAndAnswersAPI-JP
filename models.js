const db = require('./dbconnection.js');

module.exports = {
  getAllQuestions: (product_id, page, count, callback) => {
    // TODO: Add answers here (or call answers fn from controllers?) and change column names to match legacy.
    var limitStart = page * count;
    var queryStr = `
                    SELECT * FROM questions
                    WHERE product_id = $1 AND reported = false
                    ORDER BY helpful DESC
                    OFFSET $2
                    LIMIT $3
      `;
    var values = [product_id, limitStart, count];
    db.query(queryStr, values, (err, data) => {
      if (err) {
        callback(err);
      } else {
        var reshapedData = {
          product_id: product_id,
          page:page,
          count:count,
          results:data.rows
        };
        callback(null, reshapedData);
      }
    });
  },

  getAllAnswers: (question_id, page, count, callback) => {
    var limitStart = page * count;
    // Get everything besides the photos
    // TODO: Add photos
    var queryStr = `SELECT a.id, a.body, a.date_written, a.answerer_name, a.helpful
                    FROM answers AS a
                    WHERE a.question_id = $1 AND a.reported = false
                    ORDER BY a.helpful DESC
                    OFFSET $2
                    LIMIT $3`;
    var values = [question_id, limitStart, count]
    db.query(queryStr, values, (err, data) => {
      if (err) {
        callback(err);
      } else {
        var reshapedData = {
          question: question_id,
          page:page,
          count:count,
          results:[]
        };
        var dateConverter = (utcSeconds) => {
          var newDate = new Date(utcSeconds*1000);
          // var newDate = new Date(0);
          // newDate.setUTCSeconds(utcSeconds);
          return newDate;
        }
        data.rows.forEach(row => {
          var reshapedRow = {
            answer_id: row.id,
            body:row.body,
            date:dateConverter(row.date_written),
            answerer_name:row.answerer_name,
            helpfulness:row.helpful
          };
          reshapedData.results.push(reshapedRow);
        });
        callback(null, reshapedData);
      }
    });
  },


  postQuestion: (questionObj, callback) => {
    console.log("got to models.postQuestion with this questionObj: ", questionObj);
    var queryStr = `INSERT INTO questions VALUES(
      (SELECT MAX(id)+1 FROM questions),
      $1, $2,
      (select extract(epoch from now())*1000),
      $3, $4, $5, $6
      )`;
    var values = [
      questionObj.product_id, //$1
      questionObj.body, //$2
      questionObj.name, //$3
      questionObj.email, //$4
      false, //$5 (not reported yet)
      0 // $6 (not helpful yet)
    ];
    db.query(queryStr, values, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  postAnswer: (answerObj, question_id, callback) => {
    console.log("got to models.postQuestion with this answerObj: ", answerObj, " and this question_id: ", question_id);

    var queryStr = `INSERT INTO answers VALUES(
      (SELECT MAX(id)+1 FROM answers),
      $1, $2,
      (select extract(epoch from now())*1000),
      $3, $4, $5, $6
      )`;
    var values = [
      question_id, //$1
      answerObj.body, //$2
      answerObj.name, //$3
      answerObj.email, //$4
      false, //$5 (not reported yet)
      0 // $6 (not helpful yet)
    ];
    db.query(queryStr, values, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  putHelpfulQ:(question_id, callback) => {
    console.log("got to models.putHelpfulQ with this question_id: ", question_id);
    var queryStr = `UPDATE questions SET helpful = helpful + 1 WHERE id = $1`;
    var value = [question_id]
    db.query(queryStr, value, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  putReportQ:(question_id, callback) => {
    console.log("got to models.putReportQ with this question_id: ", question_id);
    var queryStr = `UPDATE questions SET reported = true WHERE id = $1`;
    var value = [question_id]
    db.query(queryStr, value, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
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