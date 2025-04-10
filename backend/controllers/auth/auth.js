const db = require("../../model/index");
const User = db.Users;

var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendEmail = require("../../services/sendEmail");
const sendTextEmail = require("../../services/sendTextEmail");
const { Users, Reminders, Notes } = require("../../model/index");

exports.register = (req, res, next) => {
  if (!req.body.role) req.body.role = "user";
  const name = req.body.name || "John ";
  const imagePath = req.file.filename;

  // Validate request
  if (!req.body.name && !req.body.email && !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8),
      image: `http://localhost:3000/${imagePath}`,
    },
  })
    .then((result) => {
      res.status(200).send({
        result,
        message: "success",
      });
    })
    .catch((err) => {
      res.status(400).send({
        err,
        message: "failed",
      });
    });

  //Creating data to database
};

exports.login = async (req, res, next) => {
  //validating the data
  if (!req.body.email && !req.body.password) {
    res.status(400).send({
      message: "Please Check the input field",
    });
    return;
  }
  //finding the user
  let login = await User.findOne({ where: { email: req.body.email } });

  //Checking the user
  if (!login) {
    return res.send({
      status: 400,
      message: "Invalid login Credential id",
    });
  }

  //password checking
  if (bcrypt.compareSync(req.body.password, login.password)) {
    //Setting up sucurity Token
    var token = jwt.sign({ id: login.id }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    let newData = {
      id: login.id,
      name: login.name,
      role: login.role,
      email: login.email,
      image: login.image,
      token,
    };
    res.cookie("token", token);
    res.status(200).send({
      message: "success",
      newData,
    });
  } else {
    res.send({
      status: 400,
      message: "Invalid login Credential password",
    });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).send({
    status: 200,
    message: "success",
  });
};

exports.getEmailOfUser = async (req, res, next) => {
  try {
    let emails = await User.findAll({ attributes: ["email"] });
    res.status(200).send({
      message: "success",
      emails,
    });
  } catch (error) {
    res.status(400).send({
      message: "failed",
      error,
    });
  }
};

exports.sendEmailToUsers = async (req, res, next) => {
  const message = req.body.message;
  let emails = await User.findAll({ attributes: ["email"] });

  try {
    for (var i = 0; i < emails.length; i++) {
      await sendTextEmail({ email: emails[i].email, message });
    }
    res.status(200).json({
      message: "Message sent sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Message not sent",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).send({
    message: "success",
    users,
  });
};

exports.getAllReminders = async (req, res, next) => {
  const reminders = await Reminders.findAll();
  res.status(200).send({
    message: "success",
    reminders,
  });
};
exports.getAllNotes = async (req, res, next) => {
  const notes = await Notes.findAll();
  res.status(200).send({
    message: "success",
    notes,
  });
};

exports.deleteUser = async (req, res, next) => {
  console.log(req.params.id);
  const id = req.params.id;
  const user = await User.destroy({ where: { id } });
  res.status(200).send({
    message: "success",
    user,
  });
};


exports.updatePassword = async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    let password = null;

    // Hash the password only if it's provided and not empty
    if (req.body.password && req.body.password.trim() !== "") {
      password = bcrypt.hashSync(req.body.password, 8);
    }

    // Dynamically construct the updateFields object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (password !== null) updateFields.password = password;

    // Handle image upload
    if (req.file) {
      const imagePath = `http://localhost:3000/${req.file.filename}`;
      updateFields.image = imagePath;
    }

    // Update the user record
    const [updatedRows] = await User.update(updateFields, { where: { email } });

    if (updatedRows === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const id = req.params.id;
  const email = req.body.email;
  const name = req.body.name;
  let password;
  if (req.body.password !== "") {
    password = bcrypt.hashSync(req.body.password, 8);
  }

  let imagePath;
  if (req.file) {
    // If an image was uploaded, set the imagePath variable
    imagePath = req.file.filename;
  }

  let updateFields = { password, name };
  if (imagePath) {
    updateFields.image = `http://localhost:3000/${imagePath}`;
  }

  const user = await User.update(updateFields, { where: { email } });
  res.status(200).send({
    message: "success",
    user,
  });
};

exports.forgotPassword = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const findUser = await User.findOne({ where: { email: email } });
  if (!findUser) {
    return res.json({ status: 404, message: "User not found" });
  }
  findUser.otp = otp;
  await findUser.save();
  // save otp in database
  try {
    await sendEmail({ email, subject: "Reset Password", otp: otp });
    res.status(200).send({
      status: 200,
      message: "Otp sent to your email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { otp, password, email } = req.body;
  const findUser = await User.findOne({ where: { email: email } });
  if (!findUser) {
    return res.json({ status: 404, message: "User not found" });
  }
  if (findUser.otp != otp) {
    return res.json({ status: 404, message: "Invalid Otp" });
  }
  findUser.password = bcrypt.hashSync(password, 8);
  await findUser.save();
  res.json({
    status: 200,
    message: "Password reset successfully",
  });
};

exports.getMe = async (req, res, next) => {
  let user = await Users.findOne({
    where: {
      id: req.userId,
    },
  });

  res.status(200).send({
    user,
  });
};
