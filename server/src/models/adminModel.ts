import mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    require: ["true", "please enter adminName"],
  },
  adminPassword: {
    type: String,
    require: ["true", "please enter admin password"],
  },
  adminScrect: {
    type: String,
    require: ["true", "please enter adim Screct"],
  },
});

module.exports = mongoose.model("Admin", adminSchema);
