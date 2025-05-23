const app = require('./app');
const database = require('./config/db');

const PORT = 3000;

app.listen(PORT , () => {
  console.log(`Sunucu ${PORT} Portunda Çalışıyor...`);
});