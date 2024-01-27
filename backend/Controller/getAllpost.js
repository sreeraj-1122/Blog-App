const Postmodel = require("../Models/Postmodel")
const getAllpost = async (req, res) => {
    try {
        const posts = await Postmodel.find().populate("author",['name']).sort({createdAt:-1})
        res.json(posts).status(200)
    } catch (error) {
        console.log(error);
    }
}
module.exports = getAllpost  