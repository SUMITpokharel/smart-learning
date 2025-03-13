const {
  getTasks,
  createTask,
  completeTask,
  getIndividualTask,
  updateTask,
  filterTask,
  incompleteTask,
  filterTaskMonthly,
  filterTaskCategory,
  filterTaskMonthlyCategory,
} = require("../controllers/task/taskController");
const { verifyToken } = require("../middleware/authJwt");

const router = require("express").Router();

router.route("/").get(verifyToken, getTasks).post(verifyToken, createTask);
router
  .route("/:id")
  .get(verifyToken, getIndividualTask)
  .patch(verifyToken, updateTask);
router.route("/completeTask/:id").get(verifyToken, completeTask);
router.route("/incompleteTask/:id").get(verifyToken, incompleteTask);

router.route("/my-task-filter").post(verifyToken, filterTask);
router.route("/my-task-filter-monthly").post(verifyToken, filterTaskMonthly);
router
  .route("/my-task-filter-monthly-category")
  .post(verifyToken, filterTaskMonthlyCategory);

router.route("/my-task-filter-category").post(verifyToken, filterTaskCategory);

module.exports = router;
