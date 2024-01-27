const Postmodel = require("../Models/Postmodel");

const deletePost=async(req,res)=>{
    try {
        const id=req.params.id
        const data=await Postmodel.findByIdAndDelete({_id:id})
        if (data) {
            res.json("deleted successfully").status(200)
        }else{
            res.send("post not found").status(400)
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
}
module.exports=deletePost