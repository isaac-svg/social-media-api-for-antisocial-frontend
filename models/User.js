import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        min:2,
        max:50,
        required:true
    }, 
    lastname:{
        type:String,
        min:2,
        max:50,
        required:true
    },
    email:{
        type:String,
        unique:true,
        max:50,
        required:true
    },
     password:{
        type:String,
        min:5,
        required:true
    },
    picturePath:{
        type:String,
        default:""
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number
},{timestamps:true})

const User =  mongoose.model("User",userSchema)
export default User