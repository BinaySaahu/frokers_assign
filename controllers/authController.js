const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar");

const registerController = async (req, res) => {
  const { name,password, email, date_of_birth, phone, salary } = req.body;

  if(name && password && email && date_of_birth && phone && salary){

    console.log('Register req recieved for: ',email)
  
    const user = await User.findOne({ Email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      let age = getAge(date_of_birth);
      if(age < 20){
          return res.status(400).json({message:"Sorry! you are being considered underaged for using this service. You need be atleast 20 years of age for registering in this website."})
      }else if(salary < 25000){
          return res.status(400).json({message:"Sorry! you need to have atleast a monthly salary of 25000 for being able to borrow from the platform."})
      }
      const hashedPass = await bcrypt.hash(password, 10);
      var url = gravatar.url(email,{ s: "200", r: "pg", d: "mm" },true)
      try {
        if (email.includes("@") && email.includes(".")) {
          const purchasing_power = (salary*100)/190.2;
          const newUser = new User({
              Name:name,
              Phone: phone,
              Email:email,
              Password: hashedPass,
              Date_of_reg: Date.now(),
              DOB: date_of_birth,
              Salary: salary,
              Purchase_power: purchasing_power,
              Status: "Approved",
              image:url
          });
          const createdUser = await newUser.save();
          console.log(createdUser);
          return res.status(200).json({message:"User successfully registered!!"})
        } else {
          return res.status(401).json({ message: "Invalid email"});
        }
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    }
  }else{
    return res.status(400).json({message:"Please! enter all the details before submiting."})
  }

};

const loginController = async (req, res) => {
  const { password, email } = req.body;

  console.log("Login req received for: " + email)

  if (email.includes("@") && email.includes(".")) {
    const user = await User.findOne({ Email: email });

    if (user) {
      const correctPassword = await bcrypt.compare(password, user.Password);
      try {
        if (correctPassword) {
          const token = jwt.sign(
            {
              userName: user.Name,
              email: email,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "86400s" }
          );
          return res.status(200).json({
            message: "User logged in successfully",
            secrete_token: token,
            user: user,
          });
          
        } else {
          return res.status(400).json({ message: "Invalid password" });
        }
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    } else {
      return res.status(400).json({ message: "User does not exists", });
    }
  } else {
    return res.status(401).json({ message: "Invalid email" });
  }
};

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

exports.loginController = loginController;

exports.registerController = registerController;
