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
  }
}