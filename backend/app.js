const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
var cookieParser = require("cookie-parser");

const categoryRoute = require("./routes/categoryRoute");
const taskRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/notesRoute");
const reminderRoute = require("./routes/reminderRoute");
const teacherRoute = require("./routes/teacherRoute");
const helperRoute = require("./routes/helperRoute");

const shareFileRoute = require("./routes/shareFileRoute");

//Db connection building with sql / sequilize
const db = require("./model/index");

require("dotenv").config();
db.sequelize.sync({ force: false });
app.use(cookieParser());

//Data transfering configuration from frontend to backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORS
const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Seeding initial Database with Admin
const ADMIN_SEEDER = require("./seeder");
app.use(ADMIN_SEEDER);

app.use(express.static(path.join(__dirname, "uploads")));
//api integration
app.use("/api/category", categoryRoute);
app.use("/api/task", taskRoute);
app.use("/api/user", userRoute);
app.use("/api/notes", noteRoute);
app.use("/api/reminder", reminderRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/helper", helperRoute);
app.use("/api/shareFile", shareFileRoute);


app.listen(3000, () => {
  console.log("App is running on port 3000");
});
