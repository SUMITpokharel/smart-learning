module.exports = (sequelize, Sequelize) => {
  const Reminder = sequelize.define("reminder", {
    title: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    time: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("pending", "completed"),

      defaultValue: "pending",
    },
  });
  return Reminder;
};
