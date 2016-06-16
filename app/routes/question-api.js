var bodyParser = require('body-parser'); 	// get body-parser
var Question = require('../models/question');

module.exports = function(app,express) {
  var question_api_Router = express.Router();
  //accessed at Get http://localhost:8080/api
  question_api_Router.get('/', function(req,res) {
    res.json({message:'hooray! welcome to our api!'});
  });
  question_api_Router.route('/questions')
      //create a questions
      .post(function(req,res) {
        var question = new Question();
        question.type = req.body.type;
        question.sub_type = req.body.sub_type;
        question.stimulus = req.body.stimulus;
        question.stem = req.body.stem;
        question.answer_choices = req.body.answer_choices;
        question.right_answer = req.body.right_answer;
        question.save(function(err) {
          if (err) {
            res.send(err);
          }
          res.json({message:"Question created!"});
        });
      })
      //get all the questions
        .get(function(req,res) {
          Question.find({}, function(err,questions) {
            if (err) res.send(err);
            res.json({message:"nice",questions:questions});
          });
        });
  question_api_Router.route('/questions/:question_id')
      //get the question with that id
      .get(function(req,res) {
        Question.findById(req.params.question_id, function(err,question) {
          if (err) res.send(err);
          res.json(question);
        });
      })
      //update the question with this id
      .put(function(req,res) {
        Question.findById(req.params.question_id, function(err, question) {
          if(err) res.send(err);
          if  (req.body.type) question.type = req.body.type;
          if (req.body.sub_type) question.sub_type = req.body.sub_type;
          if (req.body.stimulus) question.stimulus = req.body.stimulus;
          if  (req.body.stem) question.stem = req.body.stem;
          if  (req.body.answer_choices) question.answer_choices = req.body.answer_choices;
          if  (req.body.right_answer) question.right_answer = req.body.right_answer;
          question.save(function(err) {
            if (err) res.send(err);
            res.json({message:'Question updated'});
          });
        });
      })
      //delete the user with this id
      .delete(function(req,res) {
        Question.remove({
          _id:req.params.question_id
        }, function(err,question) {
          if(err) res.send(err);
          res.json({message:'Successfully deleted'});
        });
      });
  return question_api_Router;
};
