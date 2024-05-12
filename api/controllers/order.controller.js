

const Order = require("../model/order.model")
module.exports={
    newOrder:async(req,res)=>{
        console.log(req.body);
        
        try {
            const order = new Order(req.body);
          const savedData= await order.save();
          res.status(200).json({ success: true, data: savedData})
          } catch (error) {
            res.status(400).json({ success: false, message:"Internal Server Error"})
          }   
    },
    getAll:(req,res)=>{
            Order.find().then(resp=>{
            res.status(200).json({ success: true, data: resp})
        }).catch(error=>{
            res.status(409).json({ success: false, message: "Server Error, Try After sometime"})
         })
        },
    getOrderByUser:(req,res)=>{
        console.log("caling", req.params.id)
      Order.find({_id:req.params.id}).then(resp=>{
        console.log("response", resp)
        res.status(200).json({success:true, data:resp[0]})
      }).catch(e=>{
        console.log('Error', e)
        res.status(409).json({success:false, message:"Error in fetching data."})
      })
    },
  
}