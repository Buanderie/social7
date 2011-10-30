var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
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

mongoose.model('User', UserSchema);
