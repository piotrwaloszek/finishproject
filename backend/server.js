const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./config/passport');

const productsRoutes = require('./routes/products.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const globalRoutes = require('./routes/global.routes');

const app = express();

/* MIDDLEWARE */
app.use(session({
  secret: 'deliciousCookie',
  resave: true,
  saveUninitialized: true,
  // rolling: true,
  // cookie: {
  //   httpOnly: true,
  //   maxAge: 1 * 60 * 60 * 1000
  // },
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', productsRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use(globalRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lzufo.mongodb.net/f1DB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});