const { Op } = require("sequelize");
const { Tasks, Sequelize, Categories } = require("../../model");

exports.createTask = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const { name } = req.body;
    const description = req.body.description || "";
    const date = req.body.date || "";
    const time = req.body.time || "";
    const categoryId = req.body.categoryId;
    if (!categoryId)
      return res.status(400).json({
        status: "error",
        message: "Category Id is required",
      });

    const task = await Tasks.create({
      categoryId,
      title: name,
      date,
      time,
      description,
      userId,
    });

    res.status(201).json({
      status: "success",
      message: "Task Created",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll({
      where: {
        userId: req.userId,
        status: "pending",
      },
    });
    console.log("heer");
    console.log(tasks);
    res.status(200).json({
      status: "success",
      message: "Tasks Found",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Task Deleted",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date, time, categoryId } = req.body;

    const task = await Tasks.update(
      {
        title: name,
        description,
        date,
        time,
        categoryId,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Task Updated",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.update(
      {
        status: "completed",
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Task Completed",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
exports.incompleteTask = async (req, res) => {
  try {
    console.log(req.params.id);
    const { id } = req.params;
    const task = await Tasks.update(
      {
        status: "incomplete",
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Task Incomplete",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getIndividualTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Tasks.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Task Found",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.filterTask = async (req, res) => {
  console.log(req.body);
  let month = req.body.month;
  const categoryId = req.body.categoryId;

  if (month == "Jan") {
    month = "01";
  }
  if (month == "Feb") {
    month = "02";
  }
  if (month == "Mar") {
    month = "03";
  }
  if (month == "Apr") {
    month = "04";
  }
  if (month == "May") {
    month = "05";
  }
  if (month == "Jun") {
    month = "06";
  }
  if (month == "Jul") {
    month = "07";
  }
  if (month == "Aug") {
    month = "08";
  }
  if (month == "Sept") {
    month = "09";
  }
  if (month == "Oct") {
    month = "10";
  }
  if (month == "Nov") {
    month = "11";
  }
  if (month == "Dec") {
    month = "12";
  }
  const where = {};
  if (month) {
    where.date = {
      [Op.like]: `%-${month}-%`,
    };
  }
  if (categoryId) {
    where.categoryId = categoryId;
  }

  console.log(where);

  const completedTasksCount = await Tasks.count({
    where: {
      ...where,
      status: "completed",
    },
  });

  const pendingTasksCount = await Tasks.count({
    where: {
      ...where,
      status: "pending",
    },
  });

  const incompleteTasksCount = await Tasks.count({
    where: {
      ...where,
      status: "incomplete",
    },
  });
  const categoryName = await Categories.findByPk(categoryId);

  res.status(200).json({
    status: "sucess",
    completed: completedTasksCount,
    pending: pendingTasksCount,
    incomplete: incompleteTasksCount,
    category: categoryName.name,
  });
};

exports.filterTaskMonthly = async (req, res) => {
  console.log(req.body);
  let month = req.body.month;

  if (month == "Jan") {
    month = "01";
  }
  if (month == "Feb") {
    month = "02";
  }
  if (month == "Mar") {
    month = "03";
  }
  if (month == "Apr") {
    month = "04";
  }
  if (month == "May") {
    month = "05";
  }
  if (month == "Jun") {
    month = "06";
  }
  if (month == "Jul") {
    month = "07";
  }
  if (month == "Aug") {
    month = "08";
  }
  if (month == "Sept") {
    month = "09";
  }
  if (month == "Oct") {
    month = "10";
  }
  if (month == "Nov") {
    month = "11";
  }
  if (month == "Dec") {
    month = "12";
  }
  const where = {};
  if (month) {
    where.date = {
      [Op.like]: `%-${month}-%`,
    };
  }

  console.log(where);

  const completedTasksCount = await Tasks.count({
    where: {
      ...where,
      status: "completed",
    },
  });

  const pendingTasksCount = await Tasks.count({
    where: {
      ...where,
      status: "pending",
    },
  });
  const incompleteTasksCount = await Tasks.count({
    where: {
      ...where,
      status: "incomplete",
    },
  });

  res.status(200).json({
    status: "sucess",
    completed: completedTasksCount,
    pending: pendingTasksCount,
    incomplete: incompleteTasksCount,
  });
};

exports.filterTaskCategory = async (req, res) => {
  console.log(req.body);
  let categoryId = req.body.categoryId;

  const where = {};
  if (categoryId) {
    where.categoryId = categoryId;
  }

  console.log(where);

  const completedTasksCount = await Tasks.count({
    where: {
      ...where,
      status: "completed",
    },
  });

  const pendingTasksCount = await Tasks.count({
    where: {
      ...where,
      status: "pending",
    },
  });
  const incompleteTasksCount = await Tasks.count({
    where: {
      ...where,
      status: "incomplete",
    },
  });

  res.status(200).json({
    status: "sucess",
    completed: completedTasksCount,
    pending: pendingTasksCount,
    incomplete: incompleteTasksCount,
  });
};
exports.filterTaskMonthlyCategory = async (req, res) => {
  console.log(req.body);
  let month = req.body.month;

  if (month == "Jan") {
    month = "01";
  }
  if (month == "Feb") {
    month = "02";
  }
  if (month == "Mar") {
    month = "03";
  }
  if (month == "Apr") {
    month = "04";
  }
  if (month == "May") {
    month = "05";
  }
  if (month == "Jun") {
    month = "06";
  }
  if (month == "Jul") {
    month = "07";
  }
  if (month == "Aug") {
    month = "08";
  }
  if (month == "Sept") {
    month = "09";
  }
  if (month == "Oct") {
    month = "10";
  }
  if (month == "Nov") {
    month = "11";
  }
  if (month == "Dec") {
    month = "12";
  }
  const where = {};
  if (month) {
    where.date = {
      [Op.like]: `%-${month}-%`,
    };
  }
  where.userId = req.userId;

  const tasksByCategory = await Tasks.findAll({
    attributes: [
      "categoryId",
      [Sequelize.fn("count", Sequelize.col("id")), "count"],
    ],
    where: {
      status: "completed",
    },
    group: "categoryId",
  });

  console.log("Mathi ko code");
  console.log(tasksByCategory);

  const totalCatgeory = await Tasks.findAll({
    attributes: [
      "categoryId",
      [Sequelize.fn("count", Sequelize.col("id")), "count"],
    ],
  });

  const categoriesData = tasksByCategory.map((task) => {
    return {
      category: task.categoryId,
      count: task.dataValues.count,
    };
  });

  res.status(200).json({
    status: "sucess",
    categoriesData: categoriesData,
  });
};
