 const { config } = require("../config/db");
const path = require('path');

const showCreateNote = (req, res) => {
    res.render('print');  
};

const createNote = async (req, res) => {
   const { title, content, category } = req.body;
   const userId = req.session.user.id;
  
  try {
     const connection = await config();
       await connection.execute(
            'INSERT INTO posts (user_id, title, content, category) VALUES (?, ?, ?, ?)',
            [userId, title, content, category]
        );
           res.redirect('/');
           await connection.end(); 
  } catch (error) {
       return res.status(500).send("Gönderi Oluşturulamadı...");
  }
} 

const getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
        const connection = await config();
        const [rows] = await connection.execute('SELECT * FROM posts WHERE id = ?', [postId]);
        if (rows.length === 0) {
            return res.status(404).send("Post bulunamadı.");
        }
        res.json(rows[0]);
        await connection.end(); 
    } catch (error) {
        console.log(error);
        res.status(500).send("Post getirilemedi...");
    }
};

 const deleteNote = async(req, res) => {
    const postId = req.params.id;
   
  try {
        const connection = await config();
        await connection.execute('DELETE FROM posts WHERE id = ?', [postId]);
        await connection.end(); 
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send("Post silinemedi...");
    }
  };

const getEditPostPage = async (req, res) => {
    const postId = req.params.id;
    try {
        const connection = await config();
        const [rows] = await connection.execute('SELECT * FROM posts WHERE id = ?', [postId]);
       await connection.end(); 
        if (rows.length === 0) {
            return res.status(404).send("Post bulunamadı..");
        }
        res.render('veri', { post: rows[0] });  
    } catch (error) {
        console.error("Hata..");
        res.status(500).send("Post Sayfasına Erişelemedi..");
    }
};

  const updateNote = async (req,res) => {
    const postId = req.params.id ;

    const {title , content,category} = req.body ;
    try {
        const connection = await config();
        await connection.execute(
            'UPDATE posts SET title = ?, content = ?, category = ? WHERE id = ?',
            [title, content, category, postId]
        );
        await connection.end(); 
        res.redirect('/');
    } catch (error) {
        console.error("Post güncelleme hatası:", error);
        res.status(500).send("Post güncellenemedi. Lütfen tekrar deneyin.");
    }
  };

  module.exports = {
    showCreateNote,
    createNote,
    getPostById,
    deleteNote,
    getEditPostPage,
    updateNote
  }; 