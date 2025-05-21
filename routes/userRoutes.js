const express = require("express");
const userController = require("../controllers/userControllers");

const router = express.Router();

router.get("/getUsers",userController.getUsers)
router.post("/logUsers",userController.logInUser)
router.post("/postUsers",userController.postUsers)
router.put("/putUsers/:id",userController.putUsers)
router.delete("/deleteUsers/:id",userController.deleteUsers)




module.exports = router;

