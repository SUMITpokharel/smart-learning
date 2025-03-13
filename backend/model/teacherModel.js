module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define("teacher", {
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
  
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
     subject: {
        type: Sequelize.STRING,
        },
      
    });
    return Teacher;
  };
  