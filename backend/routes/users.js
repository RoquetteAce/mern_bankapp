const express = require("express");
const router = express.Router();

const UserController = require("../controllers/users");

router.get("/", UserController.users_get_all);
router.post("/", UserController.user_create);
router.get("/:userId", UserController.user_get_by_id);
router.patch("/", UserController.reset_password);

module.exports = router;
