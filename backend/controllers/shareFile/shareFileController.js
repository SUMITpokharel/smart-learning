const { ShareFile, Sequelize, Users } = require("../../model");
const { Op } = require("sequelize");
const sendEmailFile = require("../../services/shareFileMail");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

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

    const result = await Promise.all(promises);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.store = async (req, res) => {
  try {
    console.log(req.file);
    const imagePath = req.file.filename;

    await ShareFile.create({
      title: req.body.name,
      description: req.body.description,
      userId: req.userId,
      authId: req.body.userId,
      file: `http://localhost:3000/${imagePath}`,
    });

    let sender = await Users.findOne({
      where: { id: req.userId },
    });
    let receiver = await Users.findOne({
      where: { id: req.body.userId },
    });

    const email = receiver.email;
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
    const fileRecord = await ShareFile.findOne({
      where: { id },
    });
    if (!fileRecord) {
      return res.status(404).json({ message: "File not found" });
    }
    if (!fileRecord.file) {
      return res.status(400).json({ message: "File path is missing" });
    }
    const filePath = path.join(
      __dirname,
      "../../uploads",
      fileRecord.file.split("/").pop()
    );
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found on server" });
    }
    fs.unlinkSync(filePath); // Delete the file from the server
    await ShareFile.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: 200,
      message: "Deleted",
    });
  } catch (error) {
    console.error("Error deleting file:", error);
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

    let updateFields = {
      title: req.body.title,
      description: req.body.description,
    };
    if (req.file) {
      updateFields.file = `http://localhost:3000/${req.file.filename}`;
    }

    await ShareFile.update(updateFields, {
      where: {
        id,
      },
    });

    let sender = await Users.findOne({
      where: { id: req.body.authId },
    });
    let receiver = await Users.findOne({
      where: { id: req.body.userId },
    });

    const email = receiver.email;
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
};

exports.downloadShareFile = async (req, res) => {
  const id = req.params.id;

  try {
    const fileRecord = await ShareFile.findByPk(id);
    if (!fileRecord) return res.status(404).send("File not found");

    const fileName = path.basename(fileRecord.file);
    const filePath = path.join(__dirname, "../../uploads", fileName);

    res.download(filePath, fileName); // 👈 triggers the download
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("Error downloading file");
  }
};
