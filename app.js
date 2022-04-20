const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')


dotenv.config();

const app = express();

// connection to db

mongoose.connect(process.env.MONGODB_HOST)
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/route_index');


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('css', path.join(__dirname,'css'));
app.set('js', path.join(__dirname,'js'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
})


