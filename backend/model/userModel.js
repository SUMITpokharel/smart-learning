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
    }, emailVerificationOtp: { type: Sequelize.STRING, allowNull: true }, // For email verification
    isVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
  });
  return User;
};
