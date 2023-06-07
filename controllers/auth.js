import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"


export const register =async (req,res)=>{
    
    try {
        const {firstname,password,lastname,email,friends,location,occupation,picturePath} = req.body


        const salt =  await bcrypt.genSalt(+process.env.SALT)
        const  hashedPassword =  await bcrypt.hash(password,salt)
        const user = new User({
            firstname,
            password:hashedPassword,
            lastname,
            email,
            friends,
            location,
            occupation,
            picturePath,
            viewProfile:Math.floor(Math.random()*10000),
            impressions:Math.floor(Math.random()*10000), 
        })

        const savedUser =  await user.save()
        res.status(201).josn(savedUser)
        
    } catch (error) {
        res.status(500).json({error:error.massage})
    }

}


/*LOGGING IN */
export const login = async (re,res)=>{
    try {
        const {email,password} =  req.body;
        const user =  await User.findOne({email:email}) 
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const isMatch =  await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg:"Invalid credentials"})

        const token =  jwt.sign({id:user.id},process.env.JWT_SECRET)
        delete user.token;
        res.status(200).json({token,user})
    } catch (error) {
        res.status(500).json({error:error.massage})
    }

}