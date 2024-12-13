const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required:true,
    }
})

// userSchema.post('save',async function(next){
//     try {
//         console.log("after saving the user")
//     } catch (error) {
//         next(error)
//     }
// })

userSchema.pre('save',async function(next){
    try {
        const salt=await bcrypt.genSalt(7)
        const hashedPassword=await bcrypt.hash(this.password,salt)
        this.password=hashedPassword
    } catch (error) {
        next(error)
    }
})

const user=mongoose.model("user",userSchema)
module.exports=user;