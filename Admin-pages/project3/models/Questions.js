var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  qSet: String,
  q1: String,
  q2: String,
  q3: String,
  q5: String,
});
/**
 * @class localOrg
 * @typeof Model<localOrgSchema>
 */
const question = mongoose.model('questions',questionSchema);
module.exports = question;
