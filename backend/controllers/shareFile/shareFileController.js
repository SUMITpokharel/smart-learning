const { ShareFile, Sequelize, Users } = require("../../model");
const { Op } = require("sequelize");

const sendEmailFile = require("../../services/shareFileMail");
const userModel = require("../../model/userModel");

exports.geTMyShareFile = async (req, res) => {
  try {
    const shareFiles = await ShareFile.findAll({
      where: {
        [Op.or]: [{ userId: req.userId }, { authId: req.userId }],
      },
      include: [
        {
          model: Users,
        },
      ],
    });

    // Create an array of promises to retrieve user names for each share file
    const promises = shareFiles.map(async (file) => {
      const user = await Users.findOne({
        where: {
          id: file.authId,
        },
      });
      return {
        ...file.toJSON(),
        userName: user ? user.name : null,
      };
    });

    // Wait for all promises to resolve
    const result = await Promise.all(promises);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

exports.store = async (req, res) => {
  console.log(req.file);

  const imagePath = req.file.filename;

  ShareFile.create({
    title: req.body.name,
    description: req.body.description,
    userId: req.userId,
    authId: req.body.userId,
    file: `http://localhost:3000/${imagePath}`,
  });
  try {
    let sender = await Users.findOne({
      where: { id: req.userId },
    });
    // console.log(sender)
    let receiver = await Users.findOne({
      where: { id: req.body.userId },
    });
    // console.log(receiver)
    const email = receiver.email;
    console.log(email);
    await sendEmailFile({ email, subject: "Share File", sender: sender.name });
    res.status(200).send({
      status: 200,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await ShareFile.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: 200,
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getFile = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ShareFile.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);

    console.log(id);
    let updateFields = {
      title: req.body.title,
      description: req.body.description,
    };

    if (req.file) {
      updateFields.file = `http://localhost:3000/${req.file.filename}`;
    }

    const file = await ShareFile.update(updateFields, {
      where: {
        id,
      },
    });

    try {
      let sender = await Users.findOne({
        where: { id: req.body.authId },
      });

      console.log(sender);
      let receiver = await Users.findOne({
        where: { id: req.body.userId },
      });
      console.log(receiver);
      const email = receiver.email;
      console.log(email);
      await sendEmailFile({
        email,
        subject: "Update Shared File",
        sender: sender.name,
      });
      res.status(200).send({
        status: 200,
        message: "Success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
