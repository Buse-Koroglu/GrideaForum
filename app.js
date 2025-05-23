const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const pageRoutes = require('./routes/pageRoutes');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'guvenli_anahtar',
  resave: false,
  saveUninitialized: true
}));

app.use('/',pageRoutes);
app.use('/',authRoutes);
app.use('/', noteRoutes);  

module.exports = app ;