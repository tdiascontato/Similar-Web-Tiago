const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  url: String,
  data: Object,
});

module.exports = mongoose.model("Site", siteSchema);