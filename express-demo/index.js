const logger = require('./middleware/logger');
const config = require('config')
const courses = require('./routes/courses');
const home = require('./routes/home');

const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const express = require('express');
const Joi = require("joi");
const helmet = require('helmet')
const morgan = require('morgan')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',home);

app.set('view engine','pug');
app.set('views','./views');

if(app.get('env') === "development"){
    app.use(morgan('tiny'))
    startupDebugger('Morgan enabled..')
    
}

dbDebugger("connected to DB")

app.use(logger);
app.use(function(req,res,next) {
    console.log("Authenticating..");
    next();
    
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
});