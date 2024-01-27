const User = require("../Models/Usermodel")
const fs = require('fs')

const editUser = async (req, res) => {
   try {
        const _id = req.params.id;
        let newPath;
       if (req.file) {
        const { originalname, path } = req.file
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
       }
        // Extracting information from the request body
        const { name, bio, linkdin, git, insta,yt } = req.body;

        // Updating the user using the provided information
        const newUser = await User.findByIdAndUpdate(_id, {
            name,
            bio,
            linkdin, 
            git,
            insta,
            yt,
            profile:newPath, 
        });

        // Checking if the user was found and updated
        if (!newUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Sending a success response with the updated user data
        return res.status(200).send({ message: 'User updated successfully', data: newUser });
   } catch (error) {
        console.log(error);
        res.status(500).send(error);   
   }
}

module.exports = editUser;
