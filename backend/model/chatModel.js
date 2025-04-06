module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define(
    "chat",
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: true,
      createdAt: "timestamp", // Use your timestamp field as createdAt
      updatedAt: false, // Disable updatedAt since you don't have it
    }
  );

  return Chat;
};
