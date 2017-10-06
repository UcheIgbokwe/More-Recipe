'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

global.recipe = [{
    id: 1,
    name: 'Egusi soup',
    ingredients: 'Green leaf',
    directions: 'cook',
    upvotes: 90
}, {
    id: 2,
    name: 'Rice',
    ingredients: 'water',
    directions: 'parboil',
    upvotes: 50
}, {
    id: 3,
    name: 'Pizza',
    ingredients: 'toppings',
    directions: 'grill',
    upvotes: 60
}];

router.get('/', function (req, res, next) {
    res.status(200).json({
        recipe: global.recipe,
        error: false
    });
});

router.post('/', function (req, res, next) {
    if (!req.body.id || !req.body.name || !req.body.ingredients || !req.body.directions || !req.body.upvotes) {
        res.status(404).json({
            message: 'Enter valid fields',
            error: true
        });
    }
    global.recipe.push(req.body), res.status(200).json({
        message: 'Success',
        error: false
    });
});

router.put('/:recipeid', function (req, res, next) {
    for (var i = 0; i < global.recipe.length; i++) {
        if (global.recipe[i].id === parseInt(req.params.recipeid, 10)) {
            global.recipe[i].name = req.body.name;
            global.recipe[i].ingredients = req.body.ingredients;
            global.recipe[i].directions = req.body.directions;
            res.status(200).json({
                message: "success",
                error: false
            });
        }
    }
    res.status(404).json({
        message: "invalid id",
        error: true
    });
});

router.get('/:recipeid', function (req, res, next) {
    for (var i = 0; i < global.recipe.length; i++) {
        if (global.recipe[i].id === parseInt(req.params.recipeid, 10)) {
            res.status(200).json({
                recipes: global.recipe[i],
                message: "success",
                error: false
            });
        }
    }
    res.status(400).json({
        message: "invalid id",
        error: true
    });
});

router.delete('/:recipeid', function (req, res, next) {
    for (var i = 0; i < global.recipe.length; i++) {
        if (global.recipe[i].id === parseInt(req.params.recipeid, 10)) {
            global.recipe.splice(i, 1);
            res.status(200).json({
                message: 'Recipe deleted',
                error: false
            });
        }
    }
    res.status(404).json({
        message: 'Recipe not found',
        error: true
    });
});

router.get('/recipe?sort=upvotes&order=des', function (req, res, next) {
    if (request.query.sort) {
        var sorted = global.recipe.id.sort(function (a, b) {
            return a - b;
        });
        res.status(200).json({
            recipes: sorted,
            error: false
        });
    }
});

exports.default = router;