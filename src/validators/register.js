const Joi = require('joi');

const RegisterSchema = Joi.object({
    
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    UserName: Joi.string().required(),
    Email: Joi.string().min(8).max(50).pattern(new RegExp("^[A-Za-z0-9]+@[A-Za-z0-9]+[.][A-Za-z0-9]+$")).required(),
    Password: Joi.string().min(8).max(15).pattern(new RegExp("^[A-Za-z0-9]+$")).required(),
    c_password: Joi.ref("Password"),
   
  
  }).with("Password", "c_password");


  module.exports= RegisterSchema
