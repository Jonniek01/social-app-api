const Joi = require('joi');

module.exports={
    loginValidator:Joi.object({
        email:Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password:Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    }),
    signupValidator:Joi.object({
        name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),


        email:Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        
        password:Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    }),
}