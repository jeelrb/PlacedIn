const router=require('express').Router();

router.route('/').get((req,res)=>{
    res.json("Hello from doubt");
});

module.exports = router;