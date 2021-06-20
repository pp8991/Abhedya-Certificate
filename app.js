const express = require('express');
const app = express();
const path = require('path');

/* connect to database */
const connection = require('./config/db.config');
connection.once('Open', () => console.log('DB Connected'));
connection.on('error', () =>{console.log('Error')});

/* Define routes */
const index= require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }))
app.use(express.json({
    extended: true
}))

app.use('/', index);

// catch 404
app.use(function(req, res, next) {
  res.status(404).send('Page Not Found!')
  next();
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));