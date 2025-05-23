 const path = require('path');

const getPostPage = async (req ,res) => {
    if(!req.session.user){
        return res.redirect('/login');
    }

   try {
        const connection = await config();
        const [posts] = await connection.execute('SELECT * FROM posts');
        await connection.end();

        res.render('index', { posts }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Sunucu hatası");
    }}


module.exports = getPostPage ; 