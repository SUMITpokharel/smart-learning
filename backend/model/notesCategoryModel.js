module.exports = (sequelize, Sequelize) => {
  const NotesCategory = sequelize.define("notesCategory", {
    name: {
      type: Sequelize.STRING,
    },
  });
  return NotesCategory;
};
