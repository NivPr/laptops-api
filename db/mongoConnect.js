const mongoose = require('mongoose');
const {config} = require('../config/config.js');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.mongoUser}:${config.mongoPass}@cluster0.xlj5r.mongodb.net/node_pro`);
  console.log("mongo connect node_pro...")
}
