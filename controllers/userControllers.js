const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const db = require("../config/db")
const userController = {}

userController.logInUser = (req,res)=>{
    const {email, password } = req.body;
    db.query("SELECT * from users where email = ?",[email],async(err,results)=>{
        if(err) return res.status(500).send(err)
        
        if(results.length===0) return res.status(400).send("There´s no users.")

        const passwordMatch = await bcrypt.compare(password,results[0].password)

        if(!passwordMatch){
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign(
        { id: results.id, name: results.name },
        process.env.JWT_SECRET,        
        { expiresIn: '1h' }
);

        return res.status(200).json({
            message: "Login successful",
            role:results[0].role,
            token
        });
    })
}

userController.getUsers = (req,res)=>{
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
  });
}

userController.postUsers = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('User added');
    });
  } catch (error) {
    res.status(500).send('Server error while hashing password');
  }
};

userController.putUsers = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql = 'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
    db.query(sql, [name, email, hashedPassword, role, id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('User updated');
    });
  } catch (error) {
    res.status(500).send('Server error while hashing password');
  }
};

userController.deleteUsers = (req,res)=>{
    const {id} = req.params;
    
    const sql = 'DELETE from users WHERE id = ?';
    db.query(sql,[id], (err,result)=>{
        if (err) return res.status(500).send(err);
        res.send("User deleted");
    })
}
module.exports = userController;