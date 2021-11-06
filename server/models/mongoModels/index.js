const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '../..', 'config/mongoConfig.json');
const config = require(configPath)[env];

mongoose.connect(
  `mongodb://${config.host}:${config.port}/${config.database}`,
  { useNewUrlParser: true, useUnifiedTopology: true, createIndexes: true },
  err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  }
);

mongoose.set('debug', env === 'development');

const db = {};
// db={Catalog: refCatalog, Conversation,Message, mongoose}

const fileRegExp = /^[^.].*?\.js$/;
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => fileRegExp.test(file) && file !== basename)
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

db.mongoose = mongoose;

module.exports = db;
