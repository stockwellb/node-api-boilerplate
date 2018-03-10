const fs = require('fs');
const content = fs.readFileSync(__dirname + '/data.json');
const records = JSON.parse(content);
module.exports = {
  records
};
