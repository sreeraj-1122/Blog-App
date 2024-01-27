const Postmodel = require("../Models/Postmodel");

const getUserPost = async (req, res) => {
    try {
        const { userid } = req.params;
        const userPost = await Postmodel.find({ "author": userid }).exec();
        
        if (!userPost) {
            // If no post is found for the specified author
            return res.status(404).json({ message: 'No post found for the specified author.' });
        }

        return res.status(200).json(userPost);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

module.exports = getUserPost;
