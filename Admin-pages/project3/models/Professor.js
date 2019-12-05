var mongoose = require('mongoose');

var professorSchema = new mongoose.Schema({
  a_prof: String,
  a_address: String,
  a_phone: String,
  a_email: String,
});
/**
 * @class globalOrg
 * @typeof Model<globalOrgSchema>
 */
const professor = mongoose.model('professors',professorSchema);
module.exports = professor;
