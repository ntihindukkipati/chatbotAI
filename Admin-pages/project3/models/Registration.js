var mongoose = require('mongoose');

var RegistrationSchema = new mongoose.Schema({
  login_accType : String,
  login_username : String,
  login_password : String,
  login_confirmPassword : String,
  login_email : String,
  login_phone : String
});
/**
 * @class Registration
 * @typeof Model<RegistrationSchema>
 */
const Registration = mongoose.model('Registration',RegistrationSchema);
module.exports = Registration;
