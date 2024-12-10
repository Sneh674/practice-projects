const createUser=async(req,res,next)=>{ 
    res.json({
        message: "User Created"
    })
}

export {createUser}