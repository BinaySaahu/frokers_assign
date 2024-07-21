const User = require("../models/user");

const borrowController = async (req, res) => {
  const { email } = res.locals.userData;
  const { loan_amount, tenure } = req.body;
  if (email) {
    try {
      const user = await User.findOne({ Email: email });
      if (user) {
        const purchase_power = user.Purchase_power;
        if (purchase_power >= loan_amount) {
          const interest_amt = loan_amount * 0.08 * tenure; // calculating the total interest payable in whatever tenure provided by user 
          const total_payable_amt = interest_amt + loan_amount; //amount payable after the tenure
          const monthly_repayment_amt = total_payable_amt / (12 * tenure);
          const updated_purchase_power = purchase_power + loan_amount;
          const updated_user = await User.updateOne(
            { _id: user._id },
            { $set: { Purchase_power: updated_purchase_power } }
          );
          return res
            .status(200)
            .json({
              monthly_repayment_amt: monthly_repayment_amt,
              purchase_power: updated_purchase_power,
            });
        } else {
          return res
            .status(400)
            .json({ message: "Insufficient Purchase Power" });
        }
      } else {
        return res.status(404).json({ msg: "User not found" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  } else {
    return res.status(401).json({ message: "Error in extraction of email" });
  }
};

exports.borrowController = borrowController;
