module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },

    time: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("pending", "completed", "incomplete"),

      defaultValue: "pending",
    },
  });
  return Task;
};
