const jwt = require('jsonwebtoken');

const Authorize = (req,res,next) =>{
    try{
        const token = req.params.token;
        if(token){
            const res = jwt.verify(token,process.env.SECRET);
            if(res){
                next();
            }else{
                throw new Error("unAuthourized !");
            }
        }else{
            throw new Error("Please provide user token !");
        }
    }catch(err){
        res.status(200).json({
            success:false,
            message:err.message
        });
    }
}

module.exports = { Authorize };