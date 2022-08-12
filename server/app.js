const dotenv =require('dotenv');
const mongoose= require('mongoose');
const express = require('express') ;
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

dotenv.config({path: './config.env'})
require('./db/conn')

app.use(express.json())

//linking router files
app.use(require('./router/auth'))



const PORT = process.env.PORT

// app.get('/contact', (req, res) => {
//     res.cookie('test','contactCookie')
//     res.send('contact 05849547')
// });

app.get('/signin', (req, res) => {
    res.send('sign in')
});

app.get('/signup', (req, res) => {
    res.send('signup here')
});

  app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});