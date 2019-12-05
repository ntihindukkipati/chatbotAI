var mongoose = require('mongoose');

var globalOrgSchema = new mongoose.Schema({
  g_orgName: String,
  g_city: String,
  g_state: String,
  g_zip: String,
});
/**
 * @class globalOrg
 * @typeof Model<globalOrgSchema>
 */
const globalOrg = mongoose.model('globalOrgs',globalOrgSchema);
module.exports = globalOrg;
