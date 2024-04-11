const asyncHandler=require("express-async-handler")
const jwt=require("jsonwebtoken")

const validateToken=asyncHandler(async(req,res,next)=>{
   let token;
    let authHeader=req.headers.Authorization || req.headers.authorization

    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token=authHeader.split(" ")[1]//space first 0 and 1

        jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,decoded)=>{
            if(err)
            {
                res.status(401);
                throw new Error(" User is not authorized")
            }
            console.log(decoded.user);
            req.user=decoded.user;
            //Decoded means extracting the original information from the login content //Access token means encoded information which we provide in the login function

            next();
        })

        if(!token)
        {
           res.status(401)
           throw new Error("User is not authorized or token is missing")
        }
    }
})

module.exports=validateToken


//32.44