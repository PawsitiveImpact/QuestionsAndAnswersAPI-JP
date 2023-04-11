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
    var queryStr = 'SELECT * FROM questions WHERE product_id = $1 AND reported = false';
    var values = [product_id]
    db.query(queryStr, values, (err, data) => {
      if (err) {
        callback(err);
      } else {

        callback(null, data);
      }
    });
  },

  getAllAnswers: (question_id, page, count, callback) => {
    console.log("got to models.getAllAnswers with this question_id, page, and count: ", question_id, page, count);
    var limitStart = page * count;
    // Get everything besides the photos
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


  // getNeededPhotos: (answer_id, callback) => {
  // }
    //     .then(reshapedData => {
  //       reshapedData.results.forEach(row => {
  //         var insideQuery = 'SELECT id, url FROM answers_photos WHERE answer_id = $1'
  //         var insideValues = [row.answer_id];
  //         db.query(insideQuery, insideValues)
  //           .then(photosData => {
  //           console.log("photosData.rows for row.id, ", row.id, ": ", photosData.rows);
  //           // photosData.rows.forEach
  //           var photosArray = [...photosData.rows ]
  //           row.photos = photosArray;
  //           // reshapedRow.photos = "something";
  //           console.log("reshapedData: ", reshapedData);
  //         })
  //       })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // } )
      //   }
      //     )

      // })

      //     db.query(insideQuery, insideValues)
      //       .then(photosData => {
      //         console.log("photosData.rows for row.id, ", row.id, ": ", photosData.rows);
      //         // photosData.rows.forEach
      //         var photosArray = [...photosData.rows ]
      //         reshapedRow.photos = photosArray;
      //         // reshapedRow.photos = "something";
      //         console.log("reshapedRow: ", reshapedRow);

      //       })
      //       .then(() => {

      //       })
      //       .catch(err => {
      //         console.log(err);
      //       })
  // //
  // , (err, data) => {
  //   if (err) {
  //     callback(err);
  //   } else {

};