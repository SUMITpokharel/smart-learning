const {
  getLengthsOfTables,
  getFilteredTask,
} = require("../controllers/helperController");
const { verifyToken } = require("../middleware/authJwt");

const router = require("express").Router();

router.route("/length").get(verifyToken, getLengthsOfTables);
router.route("/filteredTask").get(verifyToken, getFilteredTask);

module.exports = router;
