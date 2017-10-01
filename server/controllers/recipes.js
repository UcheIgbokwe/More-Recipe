var express = require('express')
, router = express.Router();

global.recipes = [
  {
      id: 1,
      name: 'Egusi soup',
      ingredients: 'Green leaf',
      directions: 'cook',
  },
  {
      id: 2,
      name: 'Rice',
      ingredients: 'water',
      directions: 'parboil',
  },
  {
      id: 3,
      name: 'Pizza',
      ingredients: 'toppings',
      directions: 'grill',
  }
];


router.get('/', function(req, res){
  return res.json({
      recipes: global.recipes,
      error: false
  });
});



router.put('/', function(req, res){
    for(let i=0; i < global.recipes.length; i++){
        if(global.recipes[i].id === parseInt(req.params.recipesid,10)){
            global.recipes[i].name = req.body.name;
            global.recipes[i].ingredients = req.body.ingredients;
            global.recipes[i].directions = req.body.directions;
            return res.json({
                message: 'Success',
                error: false
            });
        }
    }
    return res.status(404).json({
        message: 'User not found',
        error:true
    });

});

router.get('/', function(req, res){
    for(let i=0; i < global.recipes.length; i++){
        if(global.recipes[i].id === parseInt(req.params.recipesid,10)){
            return res.json({
                recipes: global.recipes[i],
                message: 'Success',
                error: false
            });
        }
    }
    return res.status(404).json({
        message: 'recipe not found',
        error:true
    });
});

router.delete('/', function(req, res){
    for(let i=0; i < global.recipes.length; i++){
        if(global.recipes[i] === parseInt(req.params.recipesid,10)){
            global.recipes.splice(i,1);
            return res.json({
                message: 'Success',
                error: fasle
            })
        }
    }    
});

router.post('/', function(req, res){
    if(!req.body.name){
        return res.status(400).json({
            message: 'name required',
            error: false
        });
    }
    global.recipes.push(req.body);
    return res.json({
        message: 'Success',
        error: false
    });
});







module.exports = router;