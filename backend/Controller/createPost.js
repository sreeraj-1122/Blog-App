
const fs = require('fs')
const Postmodel = require('../Models/Postmodel')
const createPost = async (req, res) => {
    try {
        const { originalname, path } = req.file
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        const { title, summary, content,bookmark } = req.body
        if (!title || !summary || !content) {
            res.status(400).send('fill all fields')
        } else {
            const authorId = req.user.id;
            console.log(authorId);
            const postDoc = await Postmodel.create({
                title,
                summary,
                content,
                bookmark,
                cover: newPath,
                author: authorId,

            })
            res.json(postDoc).status(201)
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}
module.exports = createPost