const Joi = require('joi');

const loginSchema = Joi.object({
    
    UserName: Joi.string().required(),
    Password: Joi.string().min(8).max(15).pattern(new RegExp("^[A-Za-z0-9]+$")).required(),
   
  
  }).with("Password");


  module.exports= loginSchema
