const express = require("express");
const userController = require("../controllers/userControllers");
const userMiddlewares = require("../middlewares/userMiddlewares")
const router = express.Router();

router.get("/getUsers",userController.getUsers)
router.get("/getUserById/:id",userController.getUserById)
router.post("/logUsers",userController.logInUser)
router.post("/postUsers",userMiddlewares.validateUserData,userController.postUsers)
router.put("/putUsers/:id",userController.putUsers)
router.delete("/deleteUsers/:id",userController.deleteUsers)

module.exports = router;

