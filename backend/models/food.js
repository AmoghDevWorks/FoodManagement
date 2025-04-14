const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  foodImage: {
    type: String, // Image as a URL or file path
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 2.5,
    min: 0,
    max: 5
  },
  date:{
    type:Date,
    default:new Date()
  },
  donor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'donor'
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  }
  
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
