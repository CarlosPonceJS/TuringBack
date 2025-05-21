const express = require("express");
const multer = require("multer");
const bookController = require("../controllers/bookControllers");
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get("/getBooks",bookController.getBooks)
router.get("/getBookById/:id",bookController.getBookById)
router.post("/postBooks",upload.single("image"),bookController.postBooks)
router.put("/putBooks/:id",bookController.putBooks)
router.delete("/deleteBooks/:id",bookController.deleteBooks)


module.exports = router;

