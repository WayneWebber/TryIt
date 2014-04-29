var mongoose = require('mongoose');

module.exports = mongoose.model('wb_todo', {
  text : String,
  done : Boolean,
  update : Number
});
