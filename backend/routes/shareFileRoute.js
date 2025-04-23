const {
  geTMyShareFile,
  store,
  deleteFile,
  getFile,
  updateFile,
  downloadShareFile,
} = require("../controllers/shareFile/shareFileController");
const { verifyToken } = require("../middleware/authJwt");

const router = require("express").Router();
const { multer, storage } = require("../services/multerConfig");
const upload = multer({ storage: storage });

router.route("/shareFile").get(verifyToken, geTMyShareFile);
router.route("/delete/:id").delete(verifyToken, deleteFile);
router.get("/download/:id", downloadShareFile);
router.route("/shareFile/:id").get(verifyToken, getFile);
router
  .route("/update/:id")
  .post(upload.single("image"), verifyToken, updateFile);

router
  .route("/save-shareFile")
  .post(upload.single("image"), verifyToken, store);

module.exports = router;
