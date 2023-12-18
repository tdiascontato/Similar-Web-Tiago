const mongoose = require("mongoose");
const siteSchema = new mongoose.Schema({
  url: String,
  dados: Object,
});

module.exports = mongoose.model("Site", siteSchema);
