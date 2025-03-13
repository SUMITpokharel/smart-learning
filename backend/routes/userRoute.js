const {
  register,
  login,
  getAllUsers,
  getAllNotes,
  getAllReminders,
  logout,
  updateProfile,
} = require("../controllers/auth/auth");
const { verifyToken } = require("../middleware/authJwt");

const router = require("express").Router();

const authController = require("../controllers/auth/auth");

const { multer, storage } = require("../services/multerConfig");
const upload = multer({ storage: storage });
router.route("/register").post(upload.single("image"), register);
router.route("/login").post(login);
router.route("/getAllUsers").get(verifyToken, getAllUsers);
router.route("/getAllReminders").get(verifyToken, getAllReminders);
router.route("/getAllNotes").get(verifyToken, getAllNotes);

router.route("/logout").post(verifyToken, logout);

router
  .route("/update-profile")
  .post(upload.single("image"), verifyToken, updateProfile);

router.post("/forgotpassword", authController.forgotPassword);
router.post("/resetpassword", authController.resetPassword);

router.post("/sendEmailToUsers", authController.sendEmailToUsers);

router.get("/delete/:id", authController.deleteUser);

router.route("/getme").get(verifyToken, authController.getMe);

router.patch(
  "/updatePassword",
  upload.single("image"),
  authController.updatePassword
);

module.exports = router;
