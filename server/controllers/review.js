const router=require('express').Router();

global.review = [
    {
        id: 1,
        review:'nice recipe',
        reviewer:'Ade'
    },
    {
        id: 2,
        review:'cool recipe',
        reviewer:'Frank'
    }
];

router.post('/:recipeid',(req, res,next)=>{
    if(!req.body.id){
        res.status(400).json({
            message: 'id is invalid',
            error: true,
        });
    }
    global.review.push(req.body),
    res.status(200).json({
        message: 'comment posted',
        error: false,
    });
});
router.get('/:recipeid',(req,res,next)=>{
    for(let i=0;i<global.review.length;i++){
        if(global.review[i].id === parseInt(req.params.recipeid,10)){
            res.status(200).json({
                recipes:global.review[i],
                message:"success",
                error:false
            });
        }
    }
    res.status(400).json({
        message:"invalid id",
        error: true
    });
});

export default router;