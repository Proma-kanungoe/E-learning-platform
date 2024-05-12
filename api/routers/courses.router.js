const express = require("express");
const {auth} = require("../auth/auth");
const router = express.Router();
const coursesController = require("../controllers/courses.controller");

router.route("/add").post(auth, coursesController.create);
router.route("/all").get(coursesController.getAll);
router.route("/cart").post(coursesController.getCartWithId);
router.route("/delete/:id").get(auth, coursesController.delete)

module.exports = router;