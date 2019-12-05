var mongoose = require('mongoose');

var selectedInfoSchema = new mongoose.Schema({
  selInfo: String
});
/**
 * @class localOrg
 * @typeof Model<selectedInfoSchema>
 */
const selectedInfo = mongoose.model('selectedInfos',selectedInfoSchema);
module.exports = selectedInfo;
