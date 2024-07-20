const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  Date_of_Loan_Application: {
    type: Date,
    required: true,
  },
  Loan_Amt:{
    type:Number,
    required:true
  },
  Loan_Period:{
    type:Number,
    required: true
  },
  Interest_amt:{
    type:Number,
    required:true
  }
});

const LoanList = new mongoose.model("Loans", BorrowSchema);

module.exports = LoanList;
