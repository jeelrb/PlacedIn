const router=require('express').Router();

router.route('/').get((req,res)=>{
    res.json("Hello from Profile");
});

module.exports = router;