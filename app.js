import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import recipe from './server/controllers/recipe';
import review from './server/controllers/review';

import config from './server/controllers/index';

const app=express();
const cache = {};

app.use(logger('dev'));


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

export default app;