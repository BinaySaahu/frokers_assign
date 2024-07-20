const User = require("../models/user");

const userDataController = async (req, res) => {
  const { email } = res.locals.userData;
  if (email) {
    try {
      const user = await User.findOne({ Email: email });
      if (user) {
        const required_user_data = {
          Purchase_Power_Amount: user.Purchase_power,
          Phone_Number: user.Phone,
          Email: user.Email,
          Date_of_Registration: user.Date_of_reg,
          DOB: user.DOB,
          Monthly_Salary: user.Salary,
        };
        return res.status(200).json({ data: required_user_data });
      } else {
        return res.status(404).json({ message: "User not found!!" });
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

exports.userDataController = userDataController;
