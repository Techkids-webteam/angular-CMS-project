var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var GmatQuestion = new Schema ({
  type: String,
  sub_type:String,
  stimulus: String,
  stem: String,
  answer_choices: [],
  right_answer: Number
});
module.exports = mongoose.model('Question',GmatQuestion);
