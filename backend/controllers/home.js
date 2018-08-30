var homeObj={}
homeObj.index=(req,res)=>{
    res.status(200).send("Welcome to personalized UI")
}
module.exports=homeObj