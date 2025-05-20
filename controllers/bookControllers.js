const db = require("../config/db");
const bookController = {};

bookController.getBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

bookController.postBooks = (req, res) => {
  const { title, author } = req.body;
  const sql = 'INSERT INTO books (title, author) VALUES (?, ?)';
  db.query(sql, [title, author], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Book added');
  });
};

bookController.putBooks = (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const sql = 'UPDATE books SET title = ?, author = ? WHERE id = ?';
  db.query(sql, [title, author, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Book updated');
  });
};

bookController.deleteBooks = (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM books WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Book deleted');
  });
};

module.exports = bookController;
