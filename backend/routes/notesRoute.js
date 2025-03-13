const {
  getNotes,
  createNotes,
  getSingleNote,
  deleteNote,
  getNotesByCategoryId,
  updateData,
} = require("../controllers/notes/notesController");
const { verifyToken } = require("../middleware/authJwt");

const router = require("express").Router();
const { multer, storage } = require("../services/multerConfig");
const upload = multer({ storage: storage });
router
  .route("/getNotesByCategoryId/:id")
  .get(verifyToken, getNotesByCategoryId);
router
  .route("/")
  .get(verifyToken, getNotes)
  .post(verifyToken, upload.array("files"), createNotes);

router.route("/:id").get(verifyToken, getSingleNote).delete(deleteNote);

router
  .route("/update/:id")
  .post(verifyToken, upload.array("files"), updateData);

module.exports = router;
