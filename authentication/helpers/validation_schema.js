const joi=require("@hapi/joi")

const authSchema=joi.object({
    email:joi.string().email().lowercase().required(),
    password:joi.string().min(4).required()
})

module.exports={authSchema} 
//exporting as abject as application might have multiple schemas and validations