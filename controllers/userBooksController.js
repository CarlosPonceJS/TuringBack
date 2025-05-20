const db = require("../config/db");
const userBooksController = {};

// Listar libros leídos por usuario
userBooksController.getReadBooksByUser = (req, res) => {
  const { user_id } = req.params;
  const sql = `
    SELECT b.* FROM books b
    JOIN user_books ub ON b.id = ub.book_id
    WHERE ub.user_id = ?
  `;
  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Marcar libro como leído
userBooksController.markBookAsRead = (req, res) => {
  const { user_id, book_id } = req.body;
  const sql = 'INSERT INTO user_books (user_id, book_id) VALUES (?, ?)';
  db.query(sql, [user_id, book_id], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send("Book already marked as read by this user");
      }
      return res.status(500).send(err);
    }
    res.send('Book marked as read');
  });
};

// Quitar libro leído
userBooksController.unmarkBookAsRead = (req, res) => {
  const { user_id, book_id } = req.body;
  const sql = 'DELETE FROM user_books WHERE user_id = ? AND book_id = ?';
  db.query(sql, [user_id, book_id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) {
      return res.status(404).send('Book not found in user read list');
    }
    res.send('Book unmarked as read');
  });
};

module.exports = userBooksController;
