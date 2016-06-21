var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var GmatQuestionpack = new Schema({
    available_time: String,
    question_ids: [],
    level : String
)};

module.export = mongoose.model('Questionpack', Questionpack);
