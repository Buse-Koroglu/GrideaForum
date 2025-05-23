const express = require('express');
const router = express.Router();
const { config } = require('../config/db');

// Anasayfa - Giriş yapmışsa göster, yoksa login sayfasına yönlendir.
router.get('/', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    const connection = await config();
    const [posts] = await connection.execute('SELECT * FROM posts');
    await connection.end();

    res.render('index', { posts, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Sunucu hatası");
  }
});

// Post detay sayfası (giriş zorunlu değil, istersen kontrol ekleyebilirsin)
router.get('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const connection = await config();
    const [rows] = await connection.execute('SELECT * FROM posts WHERE id = ?', [postId]);
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).send("Post bulunamadı..");
    }
    const post = rows[0];
    res.render('veri', { post });
  } catch (error) {
    res.status(500).send("Sunucu hatası");
  }
});


router.get('/print', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  try {
    const postId = req.query.id;

    if (!postId) {
      return res.render('print', { post: {} });
    }

    const connection = await config();
    const [rows] = await connection.execute('SELECT * FROM posts WHERE id = ?', [postId]);
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).send("Post bulunamadı..");
    }

    const post = rows[0];
    res.render('print', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send("Sunucu hatası");
  }
});

module.exports = router;
