const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password:{
    type: String,
    required: true
  },
  Date_of_reg: {
    type: Date,
    required: true,
  },
  DOB:{
    type : Date,
    required: true
  },
  Salary:{
    type : Number,
    required : true
  },
  Purchase_power:{
    type : Number
  },
  Status:{
    type : String
  },
  Image:{
    type : String
  }
});

const UserList = new mongoose.model("Users", UserSchema);

module.exports = UserList;
