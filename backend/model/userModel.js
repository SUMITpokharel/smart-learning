module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },

    password: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM("admin", "ADMIN", "user"),
      defaultValue: "user",
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    otp: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return User;
};
