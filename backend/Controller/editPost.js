const fs = require('fs');
const Postmodel = require('../Models/Postmodel');

const editPost = async (req, res) => {
    try {
        const id = req.params.id;
        let newPath;
        // File handling
        if (req.file) {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
             newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
        }

        const { title, summary, content } = req.body;

        // Validation (you can add more detailed validation as needed)
        if (!title || !summary || !content) {
            return res.status(400).send({ message: 'Title, summary, and content are required fields.' });
        }

        const updatedPost = await Postmodel.findByIdAndUpdate(id, {
            title,
            summary,
            content,
            
            ...(req.file && { cover: newPath }), // Only update cover if file is provided
        }, { new: true });

        if (!updatedPost) {
            return res.status(404).send({ message: 'Post not found' });
        }

        return res.status(200).send({ message: 'Post updated successfully', data: updatedPost });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

module.exports = editPost;
