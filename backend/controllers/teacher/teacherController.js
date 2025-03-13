const { Teachers, Sequelize } = require("../../model");
exports.createTeacher = async (req, res) => {
  try {
    const { name } = req.body;
    const address = req.body.address || "";
    const email = req.body.email || "";
    const phone = req.body.phone || "";
    const subject = req.body.subject || "";
    const teacher = await Teachers.create({
      name,
      address,
      email,
      phone,
      subject,
        userId: req.userId,
    });
    res.status(201).json({
      status: 201,
      message: "Teacher Created",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teachers.findAll({
      where: {
        userId: req.userId,
      },
    });
    res.status(200).json({
      status: 200,
      message: "Teachers Found",
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getIndividualTeacher = async (req, res) => {
  try {
    const teacher = await Teachers.findOne({
      where: {
        userId: req.userId,
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: 200,
      message: "Teacher Found",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teachers.destroy({
      where: {
        userId: req.userId,
        id,
      },
    });
    res.status(200).json({
      status: 200,
      message: "Teacher Deleted",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teachers.update(
      {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
      },
      {
        where: {
          userId: req.userId,
          id,
        },
      }
    );
    res.status(200).json({
      status: 200,
      message: "Teacher Updated",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
