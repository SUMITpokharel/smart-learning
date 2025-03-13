const {
  createReminder,
  getReminders,
  completeReminder,
  getIndividualReminder,
  updateReminder,
  getReminderForAdmin,
  deleteReminder,  // Add the deleteReminder controller
} = require("../controllers/reminder/reminderController");
const { verifyToken } = require("../middleware/authJwt");

const router = require("express").Router();

// Route for creating and getting reminders
router
  .route("/")
  .post(verifyToken, createReminder)
  .get(verifyToken, getReminders);

// Route for getting, updating, and deleting a specific reminder
router
  .route("/:id")
  .get(verifyToken, getIndividualReminder)
  .patch(verifyToken, updateReminder)
  .delete(verifyToken, deleteReminder);  // Delete route added here

// Route for admin to get all reminders
router.route("/reminderForAdmin").get(verifyToken, getReminderForAdmin);

// Route for marking a reminder as completed
router.route("/completeReminder/:id").patch(verifyToken, completeReminder);  // Changed from GET to PATCH for modification

module.exports = router;
