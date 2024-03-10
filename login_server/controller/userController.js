import User from "../model/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from  "jsonwebtoken";
const JWT_SECRET_KEY="newkey";


export const signUp=async (req,res)=>{
    const exist=await User.findOne({email: req.body.email});
    if(exist) return res.status(409).json("Email already exists");

    const {name,email,password}=req.body;
    const hashedPassword=bcrypt.hashSync(password,12);
    const user=new User({
       name:name,
       email:email,
       password:hashedPassword, 
    })
    try{
       await user.save();
       res.status(201).json({message:"User created",user});
    }catch(err){
       console.log('Unable to create User',err);
    }
}

export const logIn=async(req,res)=>{
    const {email,password}=req.body;
    const exist=await User.findOne({email:email});
    if(!exist) return res.status(400).json({msg:"User not found"});

    const isMatch=bcrypt.compareSync(password,exist.password);
    if(!isMatch){
        return res.status(400).json({msg:"email or password invalid"});
    }
    const token=jwt.sign({id:exist._id},JWT_SECRET_KEY,{expiresIn:'3h'});   
    res.cookie(String(exist._id),token,{
        path:'/',
        expires:new Date(Date.now()+6*3600*1000),//6 hours
        // httpOnly:true,
        sameSite : 'lax'
    });
    // return res.status(200).json({msg:"user is logged in succesfully",user:exist,token});
    return res.status(200).json({msg:"user is logged in succesfully",user:exist,token});
}

export const verifyToken=async (req,res,next)=>{
    // const cookies=req.headers.cookie;
    // const token=cookies &&  cookies.split("=")[1];
    // console.log("token is ", token);
    // console.log(token);
    const headers=req.headers[`cookie`];
    console.log(headers);
    const token=headers && headers.split("=")[1];
    console.log("token is " ,token);
    if(!token){
        return res.status(404).json({msg:"No Token Used"});
    }
    try {
        const user = await  jwt.verify(token, JWT_SECRET_KEY);
        req.id = user._id;
    } catch (err) {
        console.log(err);
        return res.status(401).json({ msg: "Invalid Token" });
    }    
    next();
}

export const getUser=async (req,res)=>{
    const userId=req.id;
    let user;
    try{
        user=await User.findById(userId,"-password");
    }catch(err){
        return  res.status(500).json({msg:`Server error ${err}`});
    }
    if(!user){
        return  res.status(400).json({msg:`user not found`});
    }
    return res.status(200).json(user);
}

