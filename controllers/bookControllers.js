const path = require("path");
const fs = require("fs");

const db = require("../config/db");
const bookController = {};

bookController.getBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

bookController.getBookById = (req, res) => {
  const {id} = req.params;
  db.query('SELECT * FROM books where id = ?',[id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};
bookController.postBooks = (req, res) => {
  const { title, author, image } = req.body;

  const sql = 'INSERT INTO books (title, author, image) VALUES (?, ?, ?)';
  db.query(sql, [title, author, image], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Book added');
  });
};

bookController.putBooks = (req, res) => {
  const { id } = req.params;
  const { title, author, image } = req.body;

  const sql = 'UPDATE books SET title = ?, author = ?, image = ? WHERE id = ?';
  db.query(sql, [title, author, image,  id], (err, result) => {
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
