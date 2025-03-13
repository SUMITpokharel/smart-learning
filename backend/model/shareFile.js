module.exports = (sequelize, Sequelize) => {
  const ShareFile = sequelize.define("sharefile", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    // owner
    authId: {
      type: Sequelize.INTEGER,
    },
    // share with
    userId: {
      type: Sequelize.INTEGER,
    },
    // file
    file: {
      type: Sequelize.STRING,
    },
  });
  return ShareFile;
};
