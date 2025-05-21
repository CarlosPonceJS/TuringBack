const db = require("../config/db");
const validator = require("validator");

const userMiddlewares = {}

userMiddlewares.validateUserData = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json("All fields (name, email, password) are required.");
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email format.");
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).send("Database error");
    if (results.length > 0) {
      return res.status(409).send("Email already exists.");
    }

    next();
  });
};

module.exports = userMiddlewares;
