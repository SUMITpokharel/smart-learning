const { Op } = require("sequelize");
const { Teachers, Notes, Reminders, Tasks } = require("../model");

exports.getLengthsOfTables = async (req, res) => {
  try {
    const reminders = await Reminders.findAll({
      where: {
        userId: req.userId,
      },
    });
    const tasks = await Tasks.findAll({
      where: {
        userId: req.userId,
      },
    });
    const notes = await Notes.findAll({
      where: {
        userId: req.userId,
      },
    });
    const teachers = await Teachers.findAll({
      where: {
        userId: req.userId,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Lengths of tables found",
      data: {
        reminders,
        tasks,
        teachers,
        notes,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getFilteredTask = async (req, res) => {
  const filteredTasksByMonth = {};

  for (let i = 0; i < 12; i++) {
    const month = i + 1;
    const tasks = await Tasks.findAll({
      where: {
        userId: req.userId,
        date: {
          [Op.and]: [
            { [Op.gte]: new Date(`2023-${month}-01`) },
            { [Op.lte]: new Date(`2023-${month}-31`) },
          ],
        },
      },
    });
    filteredTasksByMonth[month] = tasks;
  }

  res.json(filteredTasksByMonth);
};
