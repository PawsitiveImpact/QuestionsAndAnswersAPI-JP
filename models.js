const db = require('./dbconnection.js');

module.exports = {
  getAllQuestions: (product_id, page, count, callback) => {
    // TODO: Add answers here (or call answers fn from controllers?) and change column names to match legacy.
    var limitStart = page * count;
    var queryStr = `
                    SELECT
                       q.id as question_id,
                       q.body as question_body,
                       q.date_written as question_date,
                       q.asker_name,
                       q.helpful as question_helpfulness,
                       q.reported,
                       jsonb_object_agg(
                        a.id,
                          jsonb_build_object(
                            'id', a.id,
                            'body', a.body,
                            'date', a.date_written,
                            'answerer_name', a.answerer_name,
                            'helpfulness', a.helpful
                          )
                       ) FILTER (WHERE q.id = a.question_id)
                        as answers
                    FROM questions AS q
                    JOIN answers AS a
                    ON q.id = a.question_id
                    LEFT JOIN answers_photos AS p
                    ON a.id = p.answer_id
                    WHERE q.product_id = $1 AND q.reported = false
                    GROUP BY q.id
                    ORDER BY q.helpful DESC
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
    var queryStr = `SELECT
                        a.id as answer_id,
                        a.body,
                        a.date_written as date,
                        a.answerer_name,
                        a.helpful as helpfulness,
                        jsonb_agg(
                          jsonb_build_object(
                             'id', p.id,
                             'url',p.url
                          )
                        ) AS photos
                    FROM answers AS a
                    LEFT JOIN answers_photos AS p
                    ON a.id = p.answer_id
                    WHERE a.question_id = $1 AND a.reported = false
                    GROUP BY a.id
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
          results:data.rows
        };

        // data.rows.forEach(row => {
        //   var reshapedRow = {
        //     answer_id: row.id,
        //     body:row.body,
        //     date:dateConverter(row.date_written),
        //     answerer_name:row.answerer_name,
        //     helpfulness:row.helpful
        //   };
        //   reshapedData.results.push(reshapedRow);
        // });
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
    var queryStr = `UPDATE answers SET helpful = helpful + 1 WHERE id = $1`;
    var value = [answer_id]
    db.query(queryStr, value, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },

  putReportA:(answer_id, callback) => {
    console.log("got to models.putReportA with this answer_id: ", answer_id);
    var queryStr = `UPDATE answers SET reported = true WHERE id = $1`;
    var value = [answer_id]
    db.query(queryStr, value, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  }

};