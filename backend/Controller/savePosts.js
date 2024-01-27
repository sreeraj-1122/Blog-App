const Postmodel = require("../Models/Postmodel")

const savePost=async(req,res)=>{
    const { postid } = req.params;
    const { bookmark } = req.body;
    try {
        const updatedPost = await Postmodel.findByIdAndUpdate(
            postid,
          { bookmark },
          { new: true } // Return the updated document
        );
        res.json(updatedPost);
        
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
module.exports=savePost