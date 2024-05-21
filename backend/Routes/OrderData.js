const express =require("express");
const router=express.Router();
const Order =require('../model/Orders');

router.post('/orderData',async (req,res)=>{
    const email = req.body.email;
    let data=req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date})

    let eId=await Order.findOne({email})
    // console.log(data)
    if(eId==null){
        try{
        await Order.create({
            email:req.body.email,
            order_data:[data]
        }).then(()=>{
            res.json({success:true})
        })
        }
        catch(error){
          console.log(error.message);
          res.send("server error",String(error.message))
        }
    }
    else{
        try{
        await Order.findOneAndUpdate({email:req.body.email},
            { $push:{order_data: data} }).then(() => {
                res.json({ success: true })
            })
        }
        catch(error){
            console.log(error.message);
            res.send("server error",String(error.message))
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports=router;