const dbConfig = require("./../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Users Model
db.Notes = require("./../model/noteModel")(sequelize, Sequelize);
db.Reminders = require("./../model/reminderModel")(sequelize, Sequelize);
db.Tasks = require("./../model/taskModel")(sequelize, Sequelize);
db.Users = require("./../model/userModel")(sequelize, Sequelize);
db.Categories = require("./../model/categoryModel")(sequelize, Sequelize);
db.Teachers = require("./../model/teacherModel")(sequelize, Sequelize);
db.NotesImages = require("./../model/notesImagesModel")(sequelize, Sequelize);
db.NotesCategory = require("./../model/notesCategoryModel")(
  sequelize,
  Sequelize
);

db.ShareFile = require("./../model/sharefile")(sequelize, Sequelize);
db.Chat = require("./../model/chatModel")(sequelize, Sequelize);

db.Users.hasMany(db.Notes);
db.Notes.belongsTo(db.Users);

db.Users.hasMany(db.Reminders);
db.Reminders.belongsTo(db.Users);

db.Users.hasMany(db.Tasks);
db.Tasks.belongsTo(db.Users);

db.Tasks.belongsTo(db.Categories);
db.Categories.hasMany(db.Tasks);

db.Users.hasMany(db.Teachers);
db.Teachers.belongsTo(db.Users);

db.NotesCategory.hasMany(db.Notes);
db.Notes.belongsTo(db.NotesCategory);

db.Notes.hasMany(db.NotesImages);
db.NotesImages.belongsTo(db.Notes);

db.Users.hasMany(db.Categories);
db.Categories.belongsTo(db.Users);

db.Users.hasMany(db.NotesCategory);
db.NotesCategory.belongsTo(db.Users);

db.Users.hasMany(db.ShareFile);
db.ShareFile.belongsTo(db.Users);
db.Users.hasMany(db.Chat, { foreignKey: "userId" });
db.Chat.belongsTo(db.Users, { foreignKey: "userId" });

module.exports = db;
