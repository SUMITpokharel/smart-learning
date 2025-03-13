const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getIndividualCategory,
  getAllNotesCategories,
  getNotesByCategoryId,
  deleteNotesCategory,
  getAllTaskCategories,
} = require("../controllers/category/categoryController");
const { verifyToken } = require("../middleware/authJwt");

const router = require("express").Router();

router.route("/notesCategories").get(verifyToken, getAllNotesCategories);

router.route("/taskCategories").get(verifyToken, getAllTaskCategories);

router.route("/notesCategories/:id").delete(verifyToken, deleteNotesCategory);
router.route("/notesCategories/:id").get(verifyToken, getNotesByCategoryId);



router
  .route("/")
  .get(verifyToken, getCategories)
  .post(verifyToken, createCategory);

router
  .route("/:id")
  .delete(deleteCategory)
  .patch(updateCategory)
  .get(getIndividualCategory);

module.exports = router;
