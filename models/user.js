//Requires
var md5 = require('md5');

//
var Schema = mongoose.Schema;

//
var UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  name: String,
  lastseen: Date,
  isonline: Boolean,
  hashed_password: String,
  registered: Boolean
});

UserSchema.virtual('password')
    .get(function() {
        return this.hashed_password;
    })
    .set(function(password) {
        this.hashed_password = md5.digest_s(password);
    });

module.exports = mongoose.model('User', UserSchema);
