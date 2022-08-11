const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.files = require("./files.model.js")(mongoose);
db.creditCards = require("./creditCards.model.js")(mongoose);
db.services = require("./services.model.js")(mongoose);

module.exports = db;