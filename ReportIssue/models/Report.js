const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: {
    lat: Number,
    lng: Number
  },
  language: String,
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
