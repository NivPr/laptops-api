const mongoose = require("mongoose");
const Joi = require("joi");


let laptopsSchema = new mongoose.Schema({
  company:String,
  model:String,
  display:String,
  processor:String,
  ram:String,
  hard_drive:String,
  price:Number,
  os:String,
  user_id:String,
  date_created:{
    type:Date, default:Date.now()
  }
})

exports.laptopsModel = mongoose.model("laptops", laptopsSchema);

exports.validateLaptop = (_reqBody) => {
  let joiSchema = Joi.object({
    company:Joi.string().min(2).max(99).required(),
    model:Joi.string().min(2).max(99).required(),
    display:Joi.string().min(5).max(99).required(),
    processor:Joi.string().min(5).max(500).allow(null,""),
    ram:Joi.string().min(1).max(500).allow(null,""),
    hard_drive:Joi.string().min(5).max(99).required(),
    price:Joi.number().min(1).max(9999).required(),
    os:Joi.string().min(3).max(500).allow(null,"")
  })
  return joiSchema.validate(_reqBody)
}