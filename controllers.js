const models = require("./models.js");

module.exports = {
  getTwo: (req, res) => {
    models.getTwoQuestions((err, data) => {
      if(err){
        console.log(err);
      } else {
        res.json(data);
      }
    })
  }
};