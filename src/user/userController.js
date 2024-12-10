import createHttpError from "http-errors";

const createUser=async(req,res,next)=>{ 
    const {name,email,password}=req.body;
    if(!name||!email|!password){
        const error =createHttpError(400,"all fields required")
        return next(error);
    }
    res.json({
        message: "User Created"
    })
}

export {createUser}