const db = require('./dbconnection.js');
const transform = require('./transform.js');

module.exports = {
  getAllQuestions: (product_id, page, count, callback) => {
    var limitStart = page * count;
    var queryStr = `
                    SELECT
                       q.question_id,
                       q.question_body,
                       q.question_date,
                       q.asker_name,
                       q.question_helpfulness,
                       q.reported,
                       jsonb_object_agg(
                        a.answer_id,
                          jsonb_build_object(
                            'id', a.answer_id,
                            'body', a.body,
                            'date', a.date,
                            'answerer_name', a.answerer_name,
                            'helpfulness', a.helpfulness
                          )
                       ) FILTER (WHERE q.question_id = a.question_id)
                        as answers
                    FROM questions AS q
                    JOIN answers AS a
                    ON q.question_id = a.question_id
                    LEFT JOIN answers_photos AS p
                    ON a.answer_id = p.answer_id
                    WHERE q.product_id = $1 AND q.reported = false
                    GROUP BY q.question_id
                    ORDER BY q.question_helpfulness DESC
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
    var queryStr = `SELECT
                        a.answer_id,
                        a.body,
                        a.date,
                        a.answerer_name,
                        a.helpfulness,
                        jsonb_agg(
                          p.photo_object
                        ) AS photos
                    FROM answers AS a
                    LEFT JOIN answers_photos AS p
                    ON a.answer_id = p.answer_id
                    WHERE a.question_id = $1 AND a.reported = false
                    GROUP BY a.answer_id
                    ORDER BY a.helpfulness DESC
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
        callback(null, reshapedData);
      }
    });
  },

  getAllPhotosForId: (answer_id, callback) => {
    var queryStr = `SELECT photo_object
                    FROM answers_photos
                    WHERE answer_id = $1`
    var values = [answer_id];
    db.query(queryStr, values, (err, data) => {
      if (err) {
        callback(err);
      } else {
        var photosArray = []
        data.rows.forEach(row => {
           photosArray.push(row.photo_object);
        })
        callback(null, photosArray);
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