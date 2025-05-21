const express = require("express");
const bookController = require("../controllers/bookControllers");
const router = express.Router();

router.get("/getBooks",bookController.getBooks)
router.get("/getBookById/:id",bookController.getBookById)
router.post("/postBooks",bookController.postBooks)
router.put("/putBooks/:id",bookController.putBooks)
router.delete("/deleteBooks/:id",bookController.deleteBooks)


module.exports = router;

