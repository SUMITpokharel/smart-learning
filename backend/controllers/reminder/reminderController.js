const { Reminders, Sequelize, Users } = require("../../model");
const schedule = require("node-schedule");
// const sendEmail = require("../../services/sendEmail");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sumitpokhrel908@gmail.com",
    pass: "kctzdibcoerjnpmi",
  },
});
function scheduleEmail(email, date, time, title, description, res) {
  const emailTime = new Date(`${date}T${time}:00`);
  schedule.scheduleJob(emailTime, function () {
    sendEmail(email, title, description, res);
  });
}
async function sendEmail(email, title, description, res) {
  const mailOptions = {
    from: "Easy Learning <np05cp4s210115@iic.edu.np>",
    to: email,
    subject: `Reminder for ${title}`,
    text: description,
  };
  let googleRes = await transporter.sendMail(mailOptions);
 
}
exports.createReminder = async (req, res) => {
  try {
    const { title, time, date } = req.body;
    const description = req.body.description || "";
    const today = new Date().toISOString().split("T")[0];
    if (date < today)
      return res.json({
        status: 400,
        message: "Date cannot be less than today",
      });
    const user = await Users.findOne({
      where: {
        id: req.userId,
      },
    });
    const email = user.email;
    Reminders.create({
      title,
      time,
      date,
      description,
      userId: req.userId,
    }).then((reminder) => {
      if (!reminder)
        return res
          .status(200)
          .json({ message: "reminder creation fail", status: 400 });
      return res.status(201).json({ message: "reminder created", status: 200 });
    });
    scheduleEmail(email, date, time, title, description, res);

    // const job = schedule.scheduleJob("6 * * * * *", function () {
    //   console.log("The answer to life, the universe, and everything!");
    //   var currentTime = new Date().toLocaleTimeString();
    //   // console.log("Date", reminder.date > today);
    //   // //subtract one day from the today

    //   // var tomorrow = new Date(today);
    //   // tomorrow.setDate(tomorrow.getDate() - 1);
    //   // console.log("Tomorrow", tomorrow);
    //   // tomorrow = tomorrow.toISOString().split("T")[0];
    //   // console.log("Today", today);
    //   // console.log("Reminder", reminder.date);
    //   // console.log(reminder.date < today);
    //   //get time of today

    //   // currentTime = currentTime.split(":").slice(0, 2).join(":");
    //   // console.log("Current Time", currentTime);
    //   //convert currentTime to 24 hour format
    //   const convertTime12to24 = (time12h) => {
    //     const [time, modifier] = time12h.split(" ");

    //     let [hours, minutes] = time.split(":");

    //     if (hours === "12") {
    //       hours = "00";
    //     }

    //     if (modifier === "PM") {
    //       hours = parseInt(hours, 10) + 12;
    //     }

    //     return `${hours}:${minutes}`;
    //   };
    //   currentTime = convertTime12to24(currentTime);

    //   //subtract 10 minute from above current time

    //   // currentTime = currentTime.split(":");

    //   // currentTime[1] = Math.abs(parseInt(currentTime[1]) - 10);
    //   // // make int positive method js

    //   // currentTime = currentTime.join(":");
    //   // console.log("Current Time", currentTime);

    //   // get 10 minutes before reminder time
    //   if (reminder.time) {
    //     // var reminderTimes = reminder.time.split(":");
    //     // console.log(reminderTimes);
    //     // reminderTimes[1] = parseInt(reminderTimes[1]) - 10;
    //     // reminderTimes = reminderTimes.join(":");
    //     // console.log("Reminder Time", reminderTimes);
    //   }
    //   console.log(
    //     "isTimeEqaul",
    //     currentTime,
    //     reminder.time,
    //     currentTime == reminder.time
    //   );

    //   // const reminderTime = new Date();
    //   // reminderTime.setMinutes(time.getMinutes() - 10);
    //   //compare reminder time nad above time
    //   // if (reminder.date === today && reminder.time === time) {

    // if (reminder.date == today && currentTime == reminder.time) {
    // sendEmail({
    //   email: "",
    //   subject: "Reminder",
    //   time: "reminder.time",
    //   text: "Your reminder is today at " + "reminder.time",
    // });
    // console.log("hello");
    // }
    // });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminders.findAll({
      where: {
        userId: req.userId,

        status: {
          [Sequelize.Op.ne]: "completed",
        },
      },
    });

    res.status(200).json({
      status: "success",
      message: "Reminders Found",
      data: reminders,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.completeReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await Reminders.update(
      {
        status: "completed",
      },
      {
        where: {
          userId: req.userId,
          id,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Reminder Completed",
      data: reminder,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getIndividualReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await Reminders.findOne({
      where: {
        id,
        userId: req.userId,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Reminder Found",
      data: reminder,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, time, date, description } = req.body;
    const user = await Users.findOne({
      where: {
        id: req.userId,
      },
    });

    const email = user.email;

    // Check if the reminder exists
    const reminder = await Reminders.findOne({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!reminder) {
      return res.status(404).json({
        status: "error",
        message: "Reminder not found",
      });
    }

    // Update the reminder in the database
    await Reminders.update(
      {
        title,
        time,
        date,
        description,
      },
      {
        where: {
          id,
          userId: req.userId,
        },
      }
    );

    // Reschedule or send the email (depending on whether the date or time changed)
    if (date && time) {
      scheduleEmail(email, date, time, title, description, res);
    }

    res.status(200).json({
      status: "success",
      message: "Reminder Updated",
      data: { title, time, date, description },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


exports.getReminderForAdmin = async (req, res) => {
  try {
    const reminders = await Reminders.findAll();
    console.log(reminders);
    res.status(200).json({
      status: "success",
      message: "Reminders Found",
      data: reminders,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if reminder exists
    const reminder = await Reminders.findOne({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!reminder) {
      return res.status(404).json({
        status: "error",
        message: "Reminder not found",
      });
    }

    // Delete the reminder
    await Reminders.destroy({
      where: {
        id,
        userId: req.userId,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Reminder deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
