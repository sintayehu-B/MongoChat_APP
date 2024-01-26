const router = require("express").Router();
const userController = require("../controllers/User.Controller");
const roles = require("../controllers/Role.controller");
const requireUser = require("../middleware/requireUser");

router.post("/register", async (req, res) => {
  userController.user_register(req.body, roles.USER, res);
});
router.get("/get/:id", userController.readUser);
router.get("/allUser", requireUser, userController.readAll);
router.patch("/update/:id", userController.updateUser);
router.delete("/remove/:id", userController.deleteUser);
router.put("/update-password", requireUser, async (req, res) => {
  userController.change_password(req.body, res);
});
router.put("/banningUser", requireUser, async (req, res) => {
  userController.banning_users(req.body, res);
});

module.exports = router;
