const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hostSchema = new Schema({
  host: {
    type: String,
    required: true
  },
  pingCounter: {
    type: Number,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('host', hostSchema);