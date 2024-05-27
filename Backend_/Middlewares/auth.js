const jwt=require('jsonwebtoken');
require('dotenv').config();



exports.auth=(req,res,next)=>{
    try {
        // const token=req.body.token;
         const token = req.header('Authorization')?.replace('Bearer ', '');

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Missing Token",
            });
        }

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
           // console.log(decode);
            req.user=decode;
        }catch(error){
            return res.status(401).json({
                success:false,
                message:"Token invalid",
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went Wrong(Token)",

        });
    }
}

exports.isCustomer=(req,res,next)=>{
    try {
        if(req.user.role!=="customer"){
            return res.status(401).json({
                success:false,
                message:"Not a Customer",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"USER Role is not matching",
        });
    }
}

exports.isDriver=(req,res,next)=>{
    try {
        if(req.user.role!=="driver"){
            return res.status(401).json({
                success:false,
                message:"Not a driver",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"USER Role is not matching",
        });
    }
}
