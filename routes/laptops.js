const express= require("express");
const { auth } = require("../middlewares/atuh");
const { validateLaptop, laptopsModel } = require("../models/laptopsModel");
const router = express.Router();





router.get("/", async(req,res) => {
  try{
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
    let data = await laptopsModel.find({})
    .limit(perPage)
    .skip((page-1)*perPage)
    res.json(data);

  }
  catch(err){
    console.log(err);
    res.status(500).json({msg_err:"There problem in server try again later"})
  }
})




router.get("/search", async(req,res) => {
  try{
    let searchQ = req.query.s;
    let searchReg = new RegExp(searchQ,"i");
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
    let data = await laptopsModel.find({$or:[{company:searchReg},{ram:searchReg}]})
    .limit(perPage)
    .skip((page-1)*perPage)
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg_err:"There problem in server try again later"})
  }
})





router.get("/os/:osName", async(req,res) => {
  try{
    let osName = req.params.osName;
    
    let searchReg = new RegExp(osName,"i");
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
    let data = await laptopsModel.find({$or:[{os:searchReg}]})
    .limit(perPage)
    .skip((page-1)*perPage)
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg_err:"There problem in server try again later"})
  }
})




// Show the prices by min and max values
router.get("/prices", async(req,res) => {
  try{
    let maxQ = req.query.max || 999999;
    let minQ = req.query.min || 0;
    
    
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
    let data = await laptopsModel.find({price:{$gte: minQ,$lte:maxQ}})
    .limit(perPage)
    .skip((page-1)*perPage)
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg_err:"There problem in server try again later"})
  }
})






router.post("/", auth, async(req,res) => {
// Check if the body sent by client is valid
  let validBody = validateLaptop(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let laptop = new laptopsModel(req.body);
    // Add the sign in user id to the new laptop
    laptop.user_id = req.tokenData._id;
    await laptop.save();
    res.status(201).json(laptop)

  }
  catch(err){
    console.log(err);
  }
})





router.put("/:idLaptop", auth, async(req,res) => {
// Check if the body sent by client is valid
  let validBody = validateLaptop(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let idLaptop = req.params.idLaptop;
    let data = await laptopsModel.updateOne({_id:idLaptop, user_id:req.tokenData._id}, req.body);
    
    // If Sucsess-modfiedCount:1 
    
    res.json(data)
  }
  catch(err){
    console.log(err);
  }
})



router.delete("/:idDel",auth,async(req,res) => {
  try{
    let idDel = req.params.idDel;
    let data = await laptopsModel.deleteOne({_id:idDel, user_id:req.tokenData._id});
    // If Sucsess-countDelted: 1 
    res.json(data);
  }
  catch(err){
    console.log(err);
  }
})

module.exports = router;