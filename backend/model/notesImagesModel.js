module.exports = (sequelize, Sequelize) => {
  const NotesImages = sequelize.define("notesImages", {
    image: {
      type: Sequelize.STRING,
    },
  });
  return NotesImages;
};
