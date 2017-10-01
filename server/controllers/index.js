var express = require('express')
, router = express.Router();

router.use('/api/v1/recipes', require('./recipes'));
router.use('/api/v1/recipes/:recipeId', require('./reviews'));

module.exports = router;