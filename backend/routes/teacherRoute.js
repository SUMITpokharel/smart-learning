const {
  createTeacher,
  getAllTeachers,
  getIndividualTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controllers/teacher/teacherController");
const { verifyToken } = require("../middleware/authJwt");

const router = require("express").Router();

router
  .route("/")
  .post(verifyToken, createTeacher)
  .get(verifyToken, getAllTeachers);
router
  .route("/:id")
  .get(verifyToken, getIndividualTeacher)
  .delete(verifyToken, deleteTeacher)
  .patch(verifyToken, updateTeacher);

module.exports = router;
