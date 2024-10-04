const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  address: {
    building: {
      required: true,
      type: String,
    },
    coord: {
      "0": {
        required: true,
        type: Number
      },
      "1": {
        required: true,
        type: Number
      }
    },
    street: {
      required: true,
      type: String,
    },
    zipcode: {
      required: true,
      type: String,
    },
  },
  borough: {
    required: true,
    type: String
  },
  cuisine: {
    required: true,
    type: String
  },
  grades: {
    required: true,
    type: [{
      date: {
        required: true,
        type: Date
      },
      grade: {
        required: true,
        type: String
      },
      score: {
        required: true,
        type: Number
      }
    }]
  },
  name: {
    required: true,
    type: String
  },
  restaurant_id: {
    required: true,
    type: String
  }
});
module.exports = mongoose.model("restaurants", userSchema);