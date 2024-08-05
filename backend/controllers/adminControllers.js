const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//jwt token
const generateAuthToken = (admin) => {
  return jwt.sign(
    { id: admin._id, name: admin.name, email: admin.email },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
};

//Admin login
const adminLogin = async function (req, res) {
  const { adminEmail, password } = req.body;
  try {
    const validAdmin = await Admin.findOne({ email: adminEmail });
    if (!validAdmin) {
      return res.status(400).json({ msg: "Admin not found" });
    }

    const validPassword = await bcrypt.compare(password, validAdmin.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateAuthToken(validAdmin);
    res
      .header("x-auth-token", token)
      .json({ msg: "Admin Login successful", token: token });
  } catch (error) {
    console.log("Admin login failed", error);
    res.status(500);
  }
};

const createAdmin = async function (req, res) {
  const { adminName, adminEmail, password } = req.body;
  const existingAdmin = await Admin.findOne({ adminEmail });
  if (existingAdmin) {
    return res.status(400).json({ msg: "Admin already exists" });
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      const newAdmin = new Admin({
        name: adminName,
        email: adminEmail,
        password: hash,
      });

      try {
        newAdmin.save();
        res.json({ msg: "Admin created" });
      } catch (error) {
        console.log("Failed to create admin", error);
      }
    });
  }
};

module.exports = {
  adminLogin,
  createAdmin,
};
