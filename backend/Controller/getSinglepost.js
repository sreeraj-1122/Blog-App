const Postmodel = require("../Models/Postmodel")
const getSinglepost = async (req, res) => {
    try {
        const { id } = req.params;
       const postDoc=await Postmodel.findById({_id:id}).populate('author',['name','profile'])
       res.json(postDoc).status(200)
    } catch (error) {
        console.log(error);
    } 
}
module.exports = getSinglepost  