var mongoose = require('mongoose');

var userdataSchema = new mongoose.Schema({
  isbn : String,
  updated_date: String,
});
/**
 * @class userData
 * @typeof Model<userdataSchema>
 */
const userData = mongoose.model('userdatas',userdataSchema);
module.exports = userData;
