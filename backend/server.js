const express = require('express')
const app = express()
const dotenv = require('dotenv')

const router = require('./Router/router')
const cors = require('cors')
const connectDB = require('./config/db')
const corsOptions={origin:"http://localhost:5173",
                    optionSuccessStatus:200
}
app.use(express.json())
app.use(cors());
dotenv.config();  
 
app.use('/', router)

app.use('/uploads',express.static(__dirname+'/uploads'))
connectDB();

const PORT = process.env.PORT|| 5001;

app.listen(PORT, () => console.log(`server is running ${PORT}`))
