const User = require("../Models/Usermodel")
const bcrypt = require("bcrypt")



const registerFunction = async (req, res) => {
   try {
    const { name, email, password} = req.body
    const userExist = await User.findOne({ email }) 
    if (!userExist) {
        if (!name || !email || !password) {
            res.send('fill required fields').status(400)
        }
        else if (password.length < 6 || password.length >= 12) {
            res.json("password must between 6 and 12").status(400)
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const userData = await User.create({
                name,
                email, 
                password:hashedPassword,
            })
            res.json({
                name:userData.name,
                email:userData.email,
                password:userData.password,

            })
        }
    } else {
        res.send("User already exist").status(400)
    }
   } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message })
   }
}

module.exports = registerFunction 