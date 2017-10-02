const express=require('express');
const bodyParser=require('body-parser');
const recipe=require('./server/controllers/recipe');
const review=require('./server/controllers/review');
const app=express();

const config=require('./server/controllers/index');

app.use(bodyParser.json());

app.use('/api/v1/recipe',recipe);
app.use('/api/v1/recipe/review',review);

app.get('/',(req,res,next)=>{
    res.json({
        message:'route is working'
    })
});

app.listen(config.port,()=>{
    console.log('server is running at port', config.port);
});