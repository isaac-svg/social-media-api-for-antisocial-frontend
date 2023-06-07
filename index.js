import express from "express"
import bodyParser from "body-parser"
import cors  from "cors"
import mongoose from "mongoose"
import multer from "multer"
import morgan from "morgan"
import helmet from "helmet"
import dotenv from "dotenv"
import path from "path"
import {fileURLToPath} from "url"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import {register} from "./controllers/auth.js"
import { verifyToken } from "./middleware/auth.js"
import {createPost} from './controllers/post.js'


/*CONFIGURATIONS */
const __filename =  fileURLToPath(import.meta.url)
const __dirname =  path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy())
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,"public/assets")))


/*STRORAGE CONNFIGURATION */

const storage =  multer.diskStorage({
    destination:function (req,file,cb){
        cd(null,"public/assets")
    },
    filename: function (req,file,cb){
        cb(null,file.originalname)
    }
})

const upload =  multer({storage})
/* ROUTE WITH FILES */
app.post("auth/register",upload.single("picture"),register)
app.use("/post",verifyToken,upload.single("picture"),createPost)

/*ROUTES */
app.use("/auth",authRoutes)
app.use("/users",userRoutes)
app.use("/posts",postRoutes)
 
/*MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)})
})