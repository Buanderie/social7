var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  name: String,
  lastseen: Date,
  isonline: Boolean,
  hashed_password: String,
  salt: String
});

mongoose.model('Fuck', User);
