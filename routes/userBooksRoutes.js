const express = require("express");
const userBooksController = require("../controllers/userBooksController")

const router = express.Router();

router.get("/getReadBooksByUser/:id",userBooksController.getReadBooksByUser)
router.post("/markBookAsRead",userBooksController.markBookAsRead)
router.delete("/deleteBooks",userBooksController.unmarkBookAsRead)


module.exports = router;

