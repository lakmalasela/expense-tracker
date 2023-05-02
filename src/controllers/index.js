const fs = require('fs'); //filesystem
const path = require('path'); //path module

const basename = path.basename(__filename);
//generate name, handler pairs
module.exports = fs
    .readdirSync(__dirname)
    .filter((file)=> file !== basename)
    .map((file)=>[path.basename(file, '.js'), require(`./${file}`)]);