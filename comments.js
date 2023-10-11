// Create web server
var express = require('express');
var router = express.Router();
var db = require('../db');

// Get all comments
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM Comments', function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

// Get a comment by id
router.get('/:id', function(req, res, next) {
  db.query('SELECT * FROM Comments WHERE id = ?', req.params.id, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

// Get all comments by post_id
router.get('/post/:post_id', function(req, res, next) {
  db.query('SELECT * FROM Comments WHERE post_id = ?', req.params.post_id, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

// Get all comments by user_id
router.get('/user/:user_id', function(req, res, next) {
  db.query('SELECT * FROM Comments WHERE user_id = ?', req.params.user_id, function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

// Create a new comment
router.post('/', function(req, res, next) {
  var comment = {
    post_id: req.body.post_id,
    user_id: req.body.user_id,
    content: req.body.content,
    created_at: new Date()
  };

  db.query('INSERT INTO Comments SET ?', comment, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Update a comment
router.put('/:id', function(req, res, next) {
  db.query('UPDATE Comments SET content = ? WHERE id = ?', [req.body.content, req.params.id], function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Delete a comment
router.delete('/:id', function(req, res, next) {
  db.query('DELETE FROM Comments WHERE id = ?', req.params.id, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;