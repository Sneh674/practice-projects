const jwt=require("jsonwebtoken")
const createError=require("http-errors")


module.exports={
    signAccessToken:(userId)=>{
        return new Promise((resolve,reject)=>{
            const payload={
                name: "yours truly",
            }
            const secret=process.env.ACCESSTOKEN_SECRET
            const options={
                expiresIn: "1h",
                issuer: "pickurpage.com",
                audience: userId
            }
            jwt.sign(payload,secret,options,(err,token)=>{
                if(err) reject(err)
                resolve(token);
            })
        })
    },
}