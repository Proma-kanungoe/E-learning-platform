const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const Courses = require("../model/courses.model")
module.exports ={
    create: async(req, res)=>{    
      try {
        const course = new Courses(req.body);
        console.log(req.body)
      const savedData= await course.save();
      res.status(200).json({ success: true, data: savedData})
      } catch (error) {
        res.status(400).json({ success: false, message:"Internal Server Error"})
      }                

    },
    getAll:(req, res)=>{
        Courses.find().then(resp=>{
            res.status(200).json({ success: true, data: resp})
        }).catch(error=>{
            res.status(400).json({ success: false, message: "Server Error, Try After sometime"})
         })

    },
    getCartWithId:async(req, res)=>{
      
       try {
        console.log("ID ARR", req.body)
        const cart=await Courses.find({_id:{$in:req.body.idArr}})
        console.log("CART DATA", cart)
        res.status(200).json({ success: true, data:cart})
       } catch (error) {
        res.status(400).json({ success: false, message: "Server Error, Try After sometime"})
       }

    },
    delete:async(req, res)=>{

        Courses.findOneAndDelete({_id:req.params.id}).then((deletedData)=>{
            console.log("Deleted Data", deletedData)
            res.status(200).json({success: true,message: "Data deleted Successfully"})
        }).catch((e)=>{
            console.log("Error Deleting")
            res.status(400).json({success: false, message: "Failed Delete"})
        })

    

    }

}