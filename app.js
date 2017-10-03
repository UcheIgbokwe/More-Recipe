const express=require('express');
const bodyParser=require('body-parser');
const logger=require('morgan');

const recipe=require('./server/controllers/recipe');
const review=require('./server/controllers/review');

const app=express();
const cache = {};

app.use(logger('dev'));

const config=require('./server/controllers/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1/recipe',recipe);
app.use('/api/v1/recipe/review',review);

app.get('/',(req,res,next)=>{
    res.json({
        message:'route is working'
    });
});

app.post('/', function(req, res) {
    let query = req.query;
    Object.keys(query).forEach(function(key) {
      cache[key] = query[key];
    });
    res.status(200).end();
  });
  

app.listen(config.port,()=>{
    console.log('server is running at port', config.port);
});

module.exports = app