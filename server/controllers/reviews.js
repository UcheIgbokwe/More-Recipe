var express = require('express')
, router = express.Router();

global.reviews = [
    {
        id: 1,
        reviewer:'Ade',
        review:'comment'
    }
];

router.post('/reviews', function(req, res){
    if(!req.body.review){
        return res.status(400).json({
            message: 'review required',
            error: false
        });
    }
    global.reviews.push(req.body);
    return res.json({
        message: 'Success',
        error: false
    });
});



module.exports = router;